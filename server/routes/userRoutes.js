import express from "express";
import { userProtectBearer, userProtectCookie } from "../middlewares/userProtect.js";

import { createUser,listUsers, getUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/create", createUser); // create a new user


export default router;