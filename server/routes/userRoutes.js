import express from "express";

import { userProtectBearer } from "../middlewares/userProtect.js";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/login", userController.loginUser);

router.post("/create", userController.createUser); // create a new user


export default router;