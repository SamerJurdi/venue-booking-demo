import { Router } from 'express';
import { ensureSessionActive } from '../middleware/sessionManger.js';
import { createReservation, getReservations } from '../controllers/bookingController.js';

const router = Router();

router.get('/', ensureSessionActive, getReservations);
router.post('/create', ensureSessionActive, createReservation);

export default router;
