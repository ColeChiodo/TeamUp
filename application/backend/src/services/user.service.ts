import { User, Role, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { encryptPassword } from "../utils/encryption";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  email: string,
  password: string,
  gender: string,
  username: string, // Ensure this is passed to the function
  dob: Date,
  name?: string | null, // Optional, can be undefined or null
  role: Role = Role.USER, // Default to USER, ensure it's a valid Role enum value
  phone_number?: string | null
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const hashedPassword = await encryptPassword(password); // Assuming this function exists and works as expected

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      gender,
      username,
      dob,
      name,
      role,
      phone_number,
    },
  });
};
/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async <Key extends keyof User>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: "asc" | "desc";
  },
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "isEmailVerified",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const users = await prisma.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return users as Pick<User, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async <Key extends keyof User>(
  id: number,
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "isEmailVerified",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    "id",
    "email",
    "name",
    "password",
    "role",
    "isEmailVerified",
    "createdAt",
    "updatedAt",
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async <Key extends keyof User>(
  userId: number,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ["id", "email", "name", "role"] as Key[]
): Promise<Pick<User, Key> | null> => {
  const user = await getUserById(userId, ["id", "email", "name"]);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  return updatedUser as Pick<User, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: number): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await prisma.user.delete({ where: { id: user.id } });
  return user;
};

//get all the games user joined by user's id
const getUserGames = async (userId: number) => {
  //getting data regarding user including user's teams and games
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      teamLists: {
        include: {
          team: {
            include: {
              games: true,
            },
          },
        },
      },
    },
  });

  //get all the game ids of games the user joined
  const gameIds =
    user?.teamLists.flatMap((teamList) =>
      teamList.team?.games.map((game) => game.id)
    ) || [];

  //get all the games that match game ids
  //use select to get only the data you need
  const games = await prisma.game.findMany({
    where: {
      id: { in: gameIds },
    },
    select: {
      id: true,
      date_time: true,
      number_of_players: true,
      name: true,
      sport: {
        select: {
          name: true,
        },
      },
      game_location: {
        select: {
          name: true,
        },
      },
      organizer: {
        select: {
          name: true,
        },
      },
      teams: {
        include: {
          team: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return games;
};

//create interface to return all the preferences user has in getUserPreferences
interface GetUserPreferences {
  sportName: string;
  level: string;
}

//get user's preferences by user's id
const getUserPreferences = async (userId: number) => {
  //this includes sportLevels and sport table to also get user's data regarding sportLevels and sport
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      sportLevels: {
        include: {
          sport: true,
        },
      },
    },
  });

  //store the name of sport and level of sport in intereface
  const userPreferences: GetUserPreferences[] =
    user?.sportLevels.map((sportLevel) => ({
      sportName: sportLevel.sport.name,
      level: sportLevel.level,
    })) || [];

  return userPreferences;
};

//create interface to recive all the preferences user wants to post/update in createUserPreferences
interface UpdateUserPreference {
  sport: string;
  level: string;
}

//create user's preferences
//this function can be used to post new data, and update old data
const createUserPreferences = async (
  userId: number,
  updateUserPreferences: UpdateUserPreference[]
) => {
  const sportIds: Record<string, number> = {};
  //get all the sports from the table, and store the name of sport and id as key and value
  const sports = await prisma.sport.findMany();
  sports.forEach((sport) => {
    sportIds[sport.name] = sport.id;
  });

  await Promise.all(
    updateUserPreferences.map(async ({ sport, level }) => {
      //find the sport id of sport that user prefers
      const sportId = sportIds[sport];
      //upsert creates new data if it doesn't exist. If it exists, it just updates the level
      await prisma.sportLevel.upsert({
        where: { user_id_sport_id: { user_id: userId, sport_id: sportId } },
        update: { level },
        create: {
          user_id: userId,
          sport_id: sportId,
          level: level,
        },
      });
    })
  );
};

//delte user's preference by user's id and name of sport
const deleteUserPreferences = async (userId: number, sport: string) => {
  const sportIds: Record<string, number> = {};

  //find all the sports from the table, and store the name of sport and id as key and value
  const sports = await prisma.sport.findMany();
  sports.forEach((sport) => {
    sportIds[sport.name] = sport.id;
  });

  //find the id of sport that user wants to delete
  const sportId = sportIds[sport];

  //delete mathing data from the table
  const user = await prisma.sportLevel.deleteMany({
    where: {
      user_id: userId,
      sport_id: sportId,
    },
  });
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserGames,
  getUserPreferences,
  createUserPreferences,
  deleteUserPreferences,
};
