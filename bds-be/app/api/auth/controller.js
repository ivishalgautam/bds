"use strict";

import hash from "../../lib/encryption/index.js";

import table from "../../db/models.js";
import authToken from "../../helpers/auth.js";

const verifyUserCredentials = async (req, res) => {
  let userData;

  try {
    userData = await table.UserModel.getByUsername(req);
  } catch (error) {
    console.log(error);
    return res.json(error);
    return;
  }

  if (!userData) {
    return res
      .code(404)
      .send({ message: "User with that username does not exist" });
    return;
  }

  let passwordIsValid = await hash.verify(req.body.password, userData.password);

  if (!passwordIsValid) {
    return res.send(
      "Invalid password",
      "Incorrect password. Please enter a valid password"
    );
    return;
  }

  const [jwtToken, expiresIn] = authToken.generateAccessToken(userData);
  const refreshToken = authToken.generateRefreshToken(userData);

  return res.send({
    token: jwtToken,
    expire_time: Date.now() + expiresIn,
    refresh_token: refreshToken,
    user_data: userData,
  });
  return;
};

const createNewUser = async (req, res) => {
  let userData;
  try {
    userData = await table.UserModel.getByUsername(req);
    if (userData) {
      return res.send(
        "already_exists",
        "User with that username already exists"
      );
      return;
    }

    await table.UserModel.create(req);

    return res.send({
      message: "User created successfully. Please verify your email.",
    });
    return;
  } catch (error) {
    console.log(error);
    return res.send(error);
    return;
  }
};

const verifyRefreshToken = async (req, res) => {
  return authToken.verifyRefreshToken(req, res);
};

export default {
  verifyUserCredentials,
  createNewUser,
  verifyRefreshToken,
};