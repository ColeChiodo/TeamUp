import { Role } from "@prisma/client";
import Joi from "joi";
import { password } from "./custom.validation";

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN),
    // Include new fields in validation schema
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    username: Joi.string().required(),
    phone_number: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const getUserGames = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const getUserPreferences = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const postUserPreferences = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    updateUserPreferences: Joi.array()
      .items(
        Joi.object({
          sport: Joi.string().required(),
          level: Joi.string()
            .valid("New", "Beginner", "Intermediate", "Expert", "Professional")
            .required(),
        })
      )
      .required(),
  }),
};

const getHostedGames = {
  params: Joi.object().keys({
    userId: Joi.number().integer(),
  }),
};

const getUserByUsername = {
  params: Joi.object().keys({
    username: Joi.string().required(),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
  getUserGames,
  getUserPreferences,
  postUserPreferences,
  getHostedGames,
};
