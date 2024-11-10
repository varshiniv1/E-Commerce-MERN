import passport from "passport";
import { ApiError } from "./apiError.js";
import httpStatus from "http-status";
import { roles } from '../config/roles.js';

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized'));
    }
    req.user = user;

    // Check permissions
    if (rights.length) {
        const action = rights[0]; // createAny, readAny
        const resource = rights[1]; // dog, profile, user
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN, "Sorry, you don't have enough rights"));
        }
        res.locals.permission = permission;
    }
    resolve();
};

const auth = (...rights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject, rights))(req, res, next);
    })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
