import express from "express";
import auth from "../../middlewares/auth";
import { gameController } from "../../controllers";

const router = express.Router();

router.get("/nearby", gameController.fetchGamesByLocation);
router.get("/sports", gameController.fetchAllSports);
router.get("/:gameId", gameController.fetchGameById);
router.post("/",auth(), gameController.createGameWithTeams);
router.post("/search", gameController.searchGames);
router.post("/join-team", auth("joinGame"), gameController.joinTeamHandler);
router.post(
  "/detach/:userId",
  auth("manageTeams"),
  gameController.detachUserFromTeam
);
router.get("/getTeams/:gameId", gameController.fetchTeamsById);

export default router;
