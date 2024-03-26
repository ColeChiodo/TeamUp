import prisma from '../client';

/**
 * Get a game by ID with details
 * @param id - The ID of the game to retrieve
 * @returns The game with specified details or null if not found
 */
const getGameById = async (id: number) => {
  return prisma.game.findUnique({
    where: { id },
    include: {
      sport: true, // Includes details of the related sport
      game_location: true, // Includes details of the related game location
      organizer: true, // Includes details of the organizer (user)
      team: true, // Includes details of the related team
    },
  });
};

export default {
  getGameById,
};