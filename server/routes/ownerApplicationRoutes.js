import express from 'express';
import {
  submitApplication,
  getAllApplications,
  reviewApplication,
  getMyApplicationStatus,
} from '../controllers/ownerApplicationController.js';
import { verifyClerkToken } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roleCheck.js';

const router = express.Router();

router.post('/', verifyClerkToken, submitApplication);
router.get('/my-status', verifyClerkToken, getMyApplicationStatus);
router.get('/', verifyClerkToken, requireRole('ADMIN'), getAllApplications);
router.patch('/:id', verifyClerkToken, requireRole('ADMIN'), reviewApplication);

export default router;