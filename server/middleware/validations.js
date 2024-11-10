import { check, validationResult } from 'express-validator';
import httpStatus from 'http-status';

const addProductValidator = [
    check('model')
        .trim().not().isEmpty().withMessage('You need to add a model').bail()
        .isLength({ min: 3 }).withMessage('Minimum 3 characters required!').bail(),
    check('brand')
        .trim().not().isEmpty().withMessage('You need to add a brand'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            });
        }
        next();
    }
];

export { addProductValidator };
