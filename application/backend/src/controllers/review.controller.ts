// src/controllers/review.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { reviewService } from '../services';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';



const createReview = async (req: Request, res: Response) => {
    try {
        const { rating, description, recipientId } = req.body;
        const reviewerId = req.user?.id; 

        if (!reviewerId) {
            return res.status(httpStatus.FORBIDDEN).json({ message: 'User not authenticated' });
        }

        const review = await reviewService.createReview({
            rating,
            description,
            reviewerId,
            recipientId
        });

        res.status(httpStatus.CREATED).json(review);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating review', error });
    }
};

const getUserReviews = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const reviews = await reviewService.findUserReviews(userId);
        res.json(reviews);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving user reviews" });
    }
};

const postGameLocationReview = async (req: Request, res: Response) => {
    const gameLocationId = parseInt(req.params.gameLocationId);
    const {rating, description } = req.body;
    const reviewerId = req.user?.id; 

        if (!reviewerId) {
            return res.status(httpStatus.FORBIDDEN).json({ message: 'User not authenticated' });
        }
    try {
        const review = await reviewService.createGameReview({
            gameLocationId,
            reviewerId,
            rating,
            description
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).send({ message: "Error posting review to game location" });
    }
};

const getGameLocationReviews = async (req: Request, res: Response) => {
    const { gameLocationId } = req.params;
    try {
        const reviews = await reviewService.getReviewsByGameLocationId(parseInt(gameLocationId));
        res.json(reviews);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve reviews", error: error });
    }
};

export default {
    createReview,
    getUserReviews,
    postGameLocationReview,
    getGameLocationReviews
}