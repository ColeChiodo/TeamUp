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

const getGameLocationById = catchAsync(async (req, res) => {
  const gameLocation = await gameLocationsService.getGameLocationById(
    parseInt(req.params.id)
  );
  res.json(gameLocation);
});

export default { listGameLocations, getGameLocationById };
