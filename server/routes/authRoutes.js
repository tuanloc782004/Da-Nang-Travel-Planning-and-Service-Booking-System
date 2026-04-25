import express from 'express';
import { getMe, syncUser } from '../controllers/authController.js';
import { verifyClerkToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', verifyClerkToken, getMe);
router.post('/sync', syncUser);

export default router;