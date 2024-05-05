import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import docsRoute from "./docs.route";
import config from "../../config/config";
import gameRoute from "./game.route";
import reviewRoute from "./review.route";
import gameLocationsRoute from "./gameLocations.route";

const router = express.Router();

// hello world route
router.get("/", (req, res) => {
  res.send("Hello Worldddd!");
});

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  { path: "/game", route: gameRoute },
  { path: "/review", route: reviewRoute },
  { path: "/gameLocations", route: gameLocationsRoute },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
