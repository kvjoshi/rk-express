import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// this is a secret key to create a jwt token
const userSecret = "SECRET123";

export const userGenerateToken = (id) => {
	return jwt.sign({ id}, userSecret, {
		expiresIn: "1d",// the token will expire in 1 day
	});
};


