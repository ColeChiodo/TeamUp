import { Request, Response } from 'express';
import { gameService } from '../services';
import httpStatus from 'http-status';
import { number } from 'joi';

 const fetchGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params; // Assuming you name the route parameter gameId
  // const game = await  gameService.getGameById(Number(gameId));
  const game = null;

  if (!game) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Game not found' });
  }

  res.status(httpStatus.OK).send(game);
};

const fetchGamesByLocation = async( req: Request, res: Response)=>{
  try {
    const { lat, lng, radius } = req.query; // Assume location is sent via query params
    const proximityRadius = 5; // Define the search radius in kilometers

    // Query your database for nearby games
    // This is pseudocode; you'll need to implement the actual database query based on your setup
    const nearbyGames = await gameService.findNearby(Number(lat) , Number(lng), Number(radius));

    res.json({ games: nearbyGames });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
 
  
}

const createGame = async (req: Request, res: Response) => {
  try {
      const { date_time, number_of_players, name, sport_id, game_location_id, user_id, team_id } = req.body;
      
      // Assuming you have validation in place for these inputs
      
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
      res.status(500).send({ message: 'Error creating game' });
  }
};

export default {
  fetchGameById,
  fetchGamesByLocation,
  createGame
};