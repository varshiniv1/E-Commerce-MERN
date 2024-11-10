import express from 'express';
import usersController from '../controllers/users.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/profile')
    .get(auth('readOwn', 'profile'), usersController.profile)
    .patch(auth('updateOwn', 'profile'), usersController.updateProfile);

router.patch('/email', auth('updateOwn', 'profile'), usersController.updateUserEmail);
router.get('/verify', usersController.verifyAccount);

export default router;
