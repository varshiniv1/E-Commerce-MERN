import {User} from "../models/user.js"; // Default import for the User model
import httpStatus from 'http-status'; // Default import for HTTP status
import { ApiError } from '../middleware/apiError.js'; // Named import for ApiError
import {findUserByEmail}  from './user.service.js'; // Named import for findUserByEmail function

const createUser = async (email, password) => {
    try {
        if (await User.emailTaken(email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken");
        }
        const user = new User({
            email,
            password,
        });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await findUserByEmail(email); // Using named import
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad email");
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry BAD password');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

export default {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword,
};
