import { Router } from 'express';
import usersController from '../controllers/usersController.js';

const router = Router();

// Define route for the controller
router.get('/test', usersController);

export default router;
