import { Router } from 'express';
import { loginUser, logoutUser, getUser } from '../controllers/usersController.js';
import { ensureSessionActive } from '../middleware/sessionManger.js';

const router = Router();

router.post('/login',  loginUser);
router.get('/logout', ensureSessionActive, logoutUser);
router.get('/user', ensureSessionActive, getUser);

export default router;
