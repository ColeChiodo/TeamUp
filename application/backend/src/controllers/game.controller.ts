import { Request, Response } from "express";
import { gameService } from "../services";
import httpStatus from "http-status";
import { number } from "joi";
import catchAsync from "../utils/catchAsync";
import { http } from "winston";

const fetchGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params; // Assuming you name the route parameter gameId
  const game = await gameService.getGameById(Number(gameId));

  if (!game) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Game not found" });
  }

  res.status(httpStatus.OK).send(game);
};

const fetchGamesByLocation = async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius } = req.query; // Assume location is sent via query params
    const proximityRadius = 5; // Define the search radius in kilometers

    // Query your database for nearby games
    // This is pseudocode; you'll need to implement the actual database query based on your setup
    const nearbyGames = await gameService.findNearby(
      Number(lat),
      Number(lng),
      Number(radius)
    );

    res.json({ games: nearbyGames });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const createGame = async (req: Request, res: Response) => {
  try {
    const {
      date_time,
      number_of_players,
      name,
      sport_id,
      game_location_id,
      user_id,
      team_id,
    } = req.body;

    // Assuming you have validation in place for these inputs
    //create n
    const game = await gameService.createGame({
      date_time,
      number_of_players,
      name,
      sport_id,
      game_location_id,
      user_id,
      team_id,
    });

    res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating game" });
  }
};

const createGameWithTeams = async (req: Request, res: Response) => {
  try {
    const {
      date_time,
      number_of_players,
      name,
      sport_id,
      game_location_id,
      user_id,
    } = req.body;
    const result = await gameService.createGameWithDefaultTeams({
      date_time: new Date(date_time),
      number_of_players,
      name,
      sport_id,
      game_location_id,
      user_id,
    });
    res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    console.error("Failed to create game with teams:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "Error creating game with teams",
    });
  }
};

// a skeleton route for searching games which just returns all games for now
const searchGames = async (req: Request, res: Response) => {
  const { sport, gameName } = req.body;
  const games = await gameService.searchGames(sport, gameName);
  res.status(httpStatus.OK).send(games);
};

const joinTeamHandler = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ message: "User not authenticated" });
  }
  const userId = req.user.id;

  const { gameId, teamId } = req.body;
  try {
    const result = await gameService.joinTeam(userId, gameId, teamId);
    res.status(200).send(result);
  } catch (error) {
    // Use a type guard to check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error joining team:", error.message);
      res.status(500).send({ message: error.message });
    } else {
      console.error("Error joining team:", error);
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

const detachUserFromTeam = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { teamId } = req.body; // Get teamId from request body
  await gameService.removeUserFromTeam(parseInt(userId), parseInt(teamId));
  res
    .status(httpStatus.OK)
    .send({ message: "User detached from team successfully" });
});

export default {
  fetchGameById,
  fetchGamesByLocation,
  createGame,
  searchGames,
  createGameWithTeams,
  joinTeamHandler,
  detachUserFromTeam,
};
