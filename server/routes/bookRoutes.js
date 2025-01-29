import express from 'express';
import * as bookController from '../controllers/bookController.js';
const router = express.Router();

router.post('/create', bookController.createBook);

export default router;