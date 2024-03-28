import express from 'express';
import auth from '../../middlewares/auth';
import { gameController } from '../../controllers';

const router = express.Router();

router.get('/nearby', gameController.fetchGamesByLocation);
router.get('/:gameId', gameController.fetchGameById);
router.post('/', gameController.createGame);

export default router;