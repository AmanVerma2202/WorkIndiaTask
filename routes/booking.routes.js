import express from 'express';
import { bookSeat, getBooking } from '../controllers/booking.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/book', authMiddleware, bookSeat);
router.get('/:id', authMiddleware, getBooking);

export default router;
