import { Request, Response } from 'express';
import { gameService } from '../services';
import httpStatus from 'http-status';

 const fetchGameById = async (req: Request, res: Response) => {
  const { gameId } = req.params; // Assuming you name the route parameter gameId
  const game = await  gameService.getGameById(Number(gameId));

  if (!game) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Game not found' });
  }

  res.status(httpStatus.OK).send(game);
};


export default {
  fetchGameById
};