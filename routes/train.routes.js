import express from 'express';
import { addTrain, getAvailability } from '../controllers/train.controller.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router();

router.post('/add', adminMiddleware, addTrain);
router.get('/get', getAvailability);

export default router;
