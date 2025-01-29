import express from "express";
import * as userController from "../controllers/userController.js";
import { userProtectBearer } from "../middlewares/userProtect.js";
const router = express.Router();

router.post("/login", userController.loginUser);

router.post("/create", userController.createUser); // create a new user
router.get("/getProfile",userProtectBearer , userController.getUserProfile);
export default router;