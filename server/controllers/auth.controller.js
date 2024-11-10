import authService from '../services/auth.service.js';
import emailService from '../services/email.service.js';

import httpStatus from 'http-status';

const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);

            // Send registration email
            await emailService.registerEmail(email, user);

            res.cookie('x-access-token', token)
                .status(httpStatus.CREATED)
                .send({
                    user,
                    token
                });
        } catch (error) {
            next(error);
        }
    },

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signInWithEmailAndPassword(email, password);
            const token = await authService.genAuthToken(user);

            res.cookie('x-access-token', token)
                .send({ user, token });
        } catch (error) {
            next(error);
        }
    },

    async isauth(req, res, next) {
        res.json(req.user);
    }
};

export default authController;
