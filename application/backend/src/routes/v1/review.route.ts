import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { reviewController } from '../../controllers';

const router = express.Router();



router.post('/create', auth(), reviewController.createReview);
router.get('/:userId', reviewController.getUserReviews);
router.post('/location/:gameLocationId/', auth(), reviewController.postGameLocationReview);
router.get('/location/:gameLocationId', reviewController.getGameLocationReviews);
export default router;