import { Router } from 'express';
import { ensureSessionActive } from '../middleware/sessionManger.js';
import { createReservation, deleteReservation, getReservations } from '../controllers/bookingController.js';
import { getReservationTypes, getVenueTypes } from '../controllers/typesController.js';
import { getVenues } from '../controllers/venueController.js'

const router = Router();

router.get('/', ensureSessionActive, getReservations);
router.post('/create', ensureSessionActive, createReservation);
router.delete('/delete/:reservationId', ensureSessionActive, deleteReservation);
router.get('/types', getReservationTypes);
router.get('/venues', getVenues);
router.get('/venues/types', getVenueTypes);

export default router;
