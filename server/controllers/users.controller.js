import userService from '../services/user.service.js';
import authService from '../services/auth.service.js';
import emailService from '../services/email.service.js';
import httpStatus from 'http-status';
import { ApiError } from '../middleware/apiError.js';


const usersController = {
    async profile(req, res, next) {
        try {
            const user = await userService.findUserById(req.user._id);
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req);
            res.json(user); // Filter response fields if needed
        } catch (error) {
            next(error);
        }
    },
    async updateUserEmail(req, res, next) {
        try {
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            // Send email to verify account
            await emailService.registerEmail(user.email, user);

            res.cookie('x-access-token', token).send({
                user,
                token,
            });
        } catch (error) {
            next(error);
        }
    },
    async verifyAccount(req, res, next) {
        try {
            const token = await userService.validateToken(req.query.validation);
            const user = await userService.findUserById(token.sub);

            if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            if (user.verified) throw new ApiError(httpStatus.BAD_REQUEST, 'Already verified');

            user.verified = true;
            await user.save(); // Ensure you await the save operation
            res.status(httpStatus.CREATED).send({
                user,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default usersController;
