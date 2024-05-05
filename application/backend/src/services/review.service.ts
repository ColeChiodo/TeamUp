// src/services/review.service.ts

import prisma from '../client';




const createReview = async (reviewData: {
    rating: number, 
    description: string, 
    reviewerId: number, 
    recipientId: number
}) => {
    return prisma.review.create({
        data: {
            rating: reviewData.rating,
            description: reviewData.description,
            reviewer: { 
                connect: { id : reviewData.reviewerId }
            },
            recipient: {
                connect: { id : reviewData.recipientId }
            }
        }
    });
};

const findUserReviews = async (userId: number) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            reviewsFor: {
                select: {
                    id: true,
                    rating: true,
                    description: true,
                    reviewer: {
                        select: {
                            name: true,
                            imageUrl: true,
                        }
                    }
                }
            }
        }
    });
};



const createGameReview = async (reviewData: {
    gameLocationId: number;
    reviewerId: number;
    rating: number;
    description: string;
}) => {
    return await prisma.gameLocationReview.create({
        data: {
            gameLocationId: reviewData.gameLocationId,
            userId: reviewData.reviewerId,
            rating: reviewData.rating,
            description: reviewData.description
        }
    });
};

const getReviewsByGameLocationId = async (gameLocationId: number) => {
    return await prisma.gameLocationReview.findMany({
        where: { gameLocationId },
        include: {
            user: {
                select: {
                    name: true,
                    imageUrl: true  
                }
            }
        }
    });
};

export default{
    createReview,
    findUserReviews,
    createGameReview,
    getReviewsByGameLocationId
}