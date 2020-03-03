import { check } from 'express-validator'

/**
 * Validator rules
 */
const validators = {
    signup:[
        check('email').isEmail(),
        check('password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
        check('username').exists(),
    ],
    login:[
        check('username').exists(),
        check('password').exists(),
    ],
    updatePassword:[
        check('current_password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
        check('new_password').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    ]
};

export {
    validators
}