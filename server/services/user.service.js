import { User } from "../models/user.js"; // Correct way to import the User model

import httpStatus from 'http-status'; // Default import for http-status
import { ApiError } from '../middleware/apiError.js'; // Named import for ApiError
import dotenv from 'dotenv'; // Default import for dotenv
import jwt from 'jsonwebtoken'; // Default import for jsonwebtoken

const { verify } = jwt; // Destructure the verify function from the jsonwebtoken module

dotenv.config(); // Initialize environment variables

const validateToken = async (token) => {
    return verify(token, process.env.DB_SECRET); // Use verify to check the token
}

// Function to find user by email
// user.service.js
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


const findUserById = async (_id) => {
    return await User.findById(_id);
}

const updateUserProfile = async (req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set": {
                    ...req.body.data // Ensure to validate what you want to patch
                }
            },
            { new: true }
        );

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found'); // Use httpStatus here
        }
        return user;
    } catch (error) {
        throw error; // Consider logging the error here
    }
}

const updateUserEmail = async (req) => {
    try {
        if (await User.emailTaken(req.body.newemail)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken'); // Use httpStatus here
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id, email: req.user.email },
            {
                "$set": {
                    email: req.body.newemail,
                    verified: false
                }
            },
            { new: true }
        );

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found'); // Use httpStatus here
        }
        return user;
    } catch (error) {
        throw error; // Consider logging the error here
    }
}

export default {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken
};
