import prisma from '../client';
import { Sport } from '@prisma/client';

/**
 * Get a game by ID with details
 * @param id - The ID of the game to retrieve
 * @returns The game with specified details or null if not found
 */
// const getGameById = async (id: number) => {
//   return prisma.game.findUnique({
//     where: { id },
//     include: {
//       sport: true, // Includes details of the related sport
//       game_location: true, // Includes details of the related game location
//       organizer: true, // Includes details of the organizer (user)
//       team: true, // Includes details of the related team
//     },
//   });
// };

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

const createGame = async (gameData: {
  date_time: Date,
  number_of_players: number,
  name: string,
  sport_id: number,
  game_location_id: number,
  user_id: number,
  team_id: number,
}) => {
  return prisma.game.create({
      data: gameData,
  });
};


const searchGames = async () => {
  // TODO: to be implemented

  // return all games for now
  return prisma.game.findMany();
};



export default {
  // getGameById,
  findNearby,
  createGame,
  searchGames,
};