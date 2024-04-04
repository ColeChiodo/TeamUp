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


const searchGames = async (sportName?: string, gameName?: string) => {
  if (sportName) {
    console.log('searching for games with sport name', sportName);
    // find the sport whose name matches the query
    const sport = await prisma.sport.findFirst({
      where: {
        name: {
          contains: sportName,
        },
      },
    });
  
    // if no sport is found, return an empty array
    if (!sport) {
      return [];
    }
    
  
    // find all games that have sport_id equal to the found sport's id
    return prisma.game.findMany({
      where: {
        sport_id: sport?.id,
      },
    });
  } else if (gameName) {
    console.log('searching for games with name', gameName);
    return prisma.game.findMany({
      where: {
        name: {
          contains: gameName,
        },
      },
    });
  }

  return [];
};



export default {
  // getGameById,
  findNearby,
  createGame,
  searchGames,
};