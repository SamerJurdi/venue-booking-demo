import { Router } from 'express';
import { ensureSessionActive } from '../middleware/sessionManger.js';
import { getReservations } from '../controllers/bookingController.js';

const router = Router();

router.get('/', ensureSessionActive, getReservations);

export default router;
