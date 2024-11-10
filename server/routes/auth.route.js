import { Router } from 'express';
import authController from '../controllers/auth.controller.js'; // Default import
import auth from '../middleware/auth.js'; // Your middleware

const router = Router();

router.post('/register', authController.register); // Use methods from authController
router.post('/signin', authController.signin);
router.get('/isauth', auth(), authController.isauth); // Ensure isauth is used correctly

export default router;

