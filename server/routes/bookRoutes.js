import express from 'express';
import * as bookController from '../controllers/bookController.js';
import { userProtectBearer } from '../middlewares/userProtect.js';
const router = express.Router();

router.post('/create',userProtectBearer, bookController.createBook);
router.get("/getBooksByUser",userProtectBearer, bookController.booksByUser);
export default router;