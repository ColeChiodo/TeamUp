import express from 'express';
import { gameController } from '../../controllers';

const router = express.Router();

router.get('/nearby', gameController.fetchGamesByLocation);
router.get('/:gameId', gameController.fetchGameById);
router.post('/', gameController.createGame);
router.post('/search', gameController.searchGames);

export default router;