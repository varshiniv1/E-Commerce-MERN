import express from 'express';
import auth from '../middleware/auth.js';
import { addTransaction } from '../services/transaction.service.js';

const router = express.Router();

router.route('/')
  .post(auth(), addTransaction);

export default router;
