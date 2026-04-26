import express from 'express';
import { syncUser } from '../controllers/authController.js';
import { verifyClerkToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/sync', verifyClerkToken, syncUser);

export default router;