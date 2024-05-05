import { Request, Response } from "express";
import httpStatus from "http-status";
import { gameLocationsService } from "../services";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";

const listGameLocations = async (req: Request, res: Response) => {
  try {
    const gameLocations = await gameLocationsService.listGameLocations();
    res.json(gameLocations);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to retrieve game-locations", error: error });
  }
};

export default { listGameLocations };
