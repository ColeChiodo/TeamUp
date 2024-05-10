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

app.post(
  "/imageUpload/:folder",
  upload.single("image"),
  catchAsync(async (req, res) => {
    // Binary data base64
    const file = req.file;
    const folder = req.params.folder;

    const imageName = `${uuidv4()}.jpg`;

    // Setting up S3 upload parameters
    const params = {
      Bucket: "teamup",
      Key: `${folder}/${imageName}`, // File name you want to save as in S3
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

      const imageUrl = `${req.protocol}://${req.get(
        "host"
      )}/view/${folder}/${imageName}`;
      res.send({
        response_code: 200,
        response_message: "Success",
        response_data: {
          ...data,
          imageUrl: imageUrl,
        },
      });
    });
  })
);

app.get(
  "/view/:folder/:imageName",
  catchAsync(async (req, res) => {
    const { folder, imageName } = req.params;

    const params = {
      Bucket: "teamup",
      Key: `${folder}/${imageName}`,
    };

    s3.getObject(params, function (err, data) {
      if (err) {
        console.error("Error fetching image:", err);
        return res.status(500).send(err);
      }

      // Set the Content-Type for JPEG images
      res.setHeader("Content-Type", "image/jpeg");

      // Use a stream to send the image data
      const stream = s3.getObject(params).createReadStream();
      stream.on("error", function (streamErr) {
        console.error("Error in stream:", streamErr);
        res.status(500).send(streamErr);
      });

      // Pipe the s3 object to the response
      stream.pipe(res);
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
