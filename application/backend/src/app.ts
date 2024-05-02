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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
