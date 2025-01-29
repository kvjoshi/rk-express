import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/create", userController.createUser); // create a new user

export default router;