import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import { Request, Response } from "express";

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role, dob, phone_number, gender, username } =
    req.body;
  console.log(req.body);
  const user = await userService.createUser(
    email,
    password,
    name,
    role,
    dob,
    phone_number,
    gender,
    username
  );
  res.status(httpStatus.CREATED).send(user);
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

const getUserGames = catchAsync(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const games = await userService.getUserGames(userId);
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching user games:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserPreferences = catchAsync(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const preferencess = await userService.getUserPreferences(userId);
    res.status(200).json(preferencess);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const createUserPreferences = catchAsync(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const selectedPreferences = req.body.selectedPreferences;

    const preferences = await userService.createUserPreferences(
      userId,
      selectedPreferences
    );
    res.status(200).json(preferences);
  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteUserPreferences = catchAsync(async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { sport } = req.body;
    const deletePreferencess = await userService.deleteUserPreferences(
      userId,
      sport
    );
    res.status(200).json(deletePreferencess);
  } catch (error) {
    console.error("Error deleting user preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserGames,
  getUserPreferences,
  createUserPreferences,
  deleteUserPreferences,
};
