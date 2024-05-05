import express from "express";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { gameLocationsController } from "../../controllers";

const router = express.Router();

router.get("/", gameLocationsController.listGameLocations);
export default router;
