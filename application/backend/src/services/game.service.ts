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

const findNearby = async (latitude : number , longitude: number, radiusInKilometers = 5) =>{
    const radiusInMeters = radiusInKilometers * 1000;
    const query = `
      SELECT *, (
        6371000 * acos (
        cos ( radians(${latitude}) )
        * cos( radians( locationLatitude ) )
        * cos( radians( locationLongitude ) - radians(${longitude}) )
        + sin ( radians(${latitude}) )
        * sin( radians( locationLatitude ) )
        )
      ) AS distance
      FROM GameLocation
      HAVING distance < ${radiusInMeters}
      ORDER BY distance
      LIMIT 10;
    `;
  
    const games = await prisma.$queryRawUnsafe(query);
    return games;
  
  
}

export default {
  getGameById,
  findNearby
};