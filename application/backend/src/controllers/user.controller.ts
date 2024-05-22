import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";

const createUser = catchAsync(async (req, res, next) => {
  const { email, password, name, role, dob, phone_number, gender, username } =
    req.body;

  try {
    const user = await userService.createUser(
      email,
      password,
      gender,
      username,
      dob,
      name,
      role,
      phone_number
    );
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).send({ message: error.message });
    } else {
      next(error); // Handle unexpected errors
    }
  }
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserByUsername = catchAsync(async (req, res) => {
  const { username } = req.params; // Extract username from URL parameter
  const user = await userService.getUserByUsername(username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const getUserGames = catchAsync(async (req, res) => {
  const games = await userService.getUserGames(req.params.userId);
  res.send(games);
});

const getUserPreferences = catchAsync(async (req, res) => {
  const preferencess = await userService.getUserPreferences(req.params.userId);
  res.send(preferencess);
});

const createUserPreferences = catchAsync(async (req, res) => {
  const preferences = await userService.createUserPreferences(
    req.params.userId,
    req.body.updateUserPreferences
  );
  res.send(preferences);
});

const getHostedGames = catchAsync(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }
  const hostedGames = await userService.getHostedGames(userId);
  res.send(hostedGames);
});

const postUserBio = catchAsync(async (req, res) => {
  const userBio = await userService.postUserBio(
    req.params.username,
    req.body.bio
  );
  res.send(userBio);
});

const getUserBio = catchAsync(async (req, res) => {
  const userBio = await userService.getUserBio(req.params.username);
  res.send(userBio);
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
  getUserGames,
  getUserPreferences,
  createUserPreferences,
  getHostedGames,
  postUserBio,
  getUserBio,
};
