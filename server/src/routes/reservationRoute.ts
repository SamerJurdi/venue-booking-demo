import { Router } from 'express';
import { ensureSessionActive } from '../middleware/sessionManger.js';
import { createReservation, getReservations } from '../controllers/bookingController.js';
import { getReservationTypes } from '../controllers/typesController.js';

const router = Router();

router.get('/', ensureSessionActive, getReservations);
router.post('/create', ensureSessionActive, createReservation);
router.get('/types', getReservationTypes);

export default router;
