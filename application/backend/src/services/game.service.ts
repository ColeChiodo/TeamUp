import prisma from '../client';
import { Sport } from '@prisma/client';

/**
 * Get a game by ID with details
 * @param id - The ID of the game to retrieve
 * @returns The game with specified details or null if not found
 */
 const getGameById = async (id: number) => {
  return prisma.game.findUnique({
   where: { id },    include: {
      sport: true, // Includes details of the related sport
      game_location: true, // Includes details of the related game location
      organizer: true, // Includes details of the organizer (user)
      
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
if (sportName && gameName) {
    console.log('searching for games with sport name', sportName, 'and game name', gameName);
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
  
    // find all games that have sport_id equal to the found sport's id and name contains the game name
    return prisma.game.findMany({
      where: {
        sport_id: sport?.id,
        name: {
          contains: gameName,
        },
      },
    }); 
} else if (sportName) {
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

const createGameWithDefaultTeams = async (gameData: {
  date_time: Date,
  number_of_players: number,
  name: string,
  sport_id: number,
  game_location_id: number,
  user_id: number
}) => {
  return await prisma.$transaction(async (prisma) => {
      const game = await prisma.game.create({
          data: {
              date_time: gameData.date_time,
              number_of_players: gameData.number_of_players,
              name: gameData.name,
              sport_id: gameData.sport_id,
              game_location_id: gameData.game_location_id,
              user_id: gameData.user_id
          }
      });

      const teams = await Promise.all([
        prisma.team.create({
            data: {
                name: `${gameData.name} Team 1`,
                sport_id: gameData.sport_id,
                user_id: gameData.user_id
            }
        }),
        prisma.team.create({
            data: {
                name: `${gameData.name} Team 2`,
                sport_id: gameData.sport_id,
                user_id: gameData.user_id
            }
        })
      ]);

      await Promise.all(teams.map(team =>
        prisma.gameOnTeam.create({
            data: {
                team_id: team.id,
                game_id: game.id
            }
        })
      ));

      return { game, teams };
  });
};

const joinTeam = async (userId: number, gameId: number, teamNumber: number) => {
  // Fetch the game with related teams
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { teams: true }
  });

  if (!game) {
    throw new Error('Game not found');
  }

  if (!game.teams || game.teams.length < 2) {
    throw new Error('Teams are not properly initialized for this game');
  }

  // Assuming teamNumber is 1 or 2
  const teamToJoin = game.teams[teamNumber - 1];
  if (!teamToJoin) {
    throw new Error('Invalid team number');
  }

  // Check if user is already a member of this team
  const isMember = await prisma.teamList.findFirst({
    where: {
      team_id: teamToJoin.id,
      user_id: userId
    }
  });

  if (isMember) {
    throw new Error('User is already a member of this team');
  }

  // Add user to the team
  await prisma.teamList.create({
    data: {
      team_id: teamToJoin.id,
      user_id: userId
    }
  });

  return { message: 'User added to team successfully' };
};

const removeUserFromTeam = async (userId: number, teamId: number): Promise<void> => {
  await prisma.teamList.deleteMany({
      where: {
          user_id: userId,
          team_id: teamId
      }
  });
};


export default {
  getGameById,
  findNearby,
  createGame,
  searchGames,
  createGameWithDefaultTeams,
  joinTeam,
  removeUserFromTeam
};