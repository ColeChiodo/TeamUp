import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import httpStatus from "http-status";
import config from "./config/config";
import morgan from "./config/morgan";
import xss from "./middlewares/xss";
import { jwtStrategy } from "./config/passport";
import { authLimiter } from "./middlewares/rateLimiter";
import routes from "./routes/v1";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import multer from "multer";
import { S3 } from "aws-sdk";
// import uuid
import { v4 as uuidv4 } from "uuid";
import catchAsync from "./utils/catchAsync";

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
// app.use(cors());
// app.options('*', cors());
// Allow specific origins or use '*' for all origins (not recommended for production)
// app.use(
//   cors({
//     origin: "https://ft97cem3fc.us-east-1.awsapprunner.com",
//   })
// );

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

console.log("the environment is: ");
console.log(config.env);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

// Configure MinIO client
const s3 = new S3({
  accessKeyId: "minioadmin",
  secretAccessKey: "minioadmin",
  endpoint: "http://127.0.0.1:9000",
  s3ForcePathStyle: true, // needed with MinIO
  signatureVersion: "v4",
});

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// app.post("/upload/:folder", upload.single("image"), (req, res) => {
//   console.log("route started");

//   const folder = req.params.folder;
//   const file = req.file;
//   const params = {
//     Bucket: "teamup", // replace with your bucket name
//     Key: `${folder}/${file?.originalname}`, // file will be saved as folderName/originalFileName
//     Body: file?.buffer,
//     ContentType: file?.mimetype,
//     ACL: "public-read", // make file publicly accessible
//   };

//   console.log("got the file. now uploading");

//   s3.upload(params, (err: any, data: any) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.status(200).send({ link: data.Location });
//   });
// });

app.post(
  "/imageUpload/:folder",
  upload.single("image"),
  catchAsync(async (req, res) => {
    // Binary data base64
    const file = req.file;
    const folder = req.params.folder;

    // Setting up S3 upload parameters
    const params = {
      Bucket: "teamup",
      Key: `${folder}/${uuidv4()}.jpg`, // File name you want to save as in S3
      Body: file?.buffer,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    // Uploading files to the bucket
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        console.log("throwing error");

        throw err;
      }
      res.send({
        response_code: 200,
        response_message: "Success",
        response_data: data,
      });
    });
  })
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
