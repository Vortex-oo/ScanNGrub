import { Router } from 'express';
import { body } from "express-validator";

import { userLogin, userSignup, userVerify } from '../controllers/user.controller.js';


const userRoutes = new Router();

userRoutes.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters long')
], userSignup);

userRoutes.post('/login',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters long')
],userLogin
)

userRoutes.post('/verify',
    [
        body('token').isString().withMessage('Invalid token')
    ],userVerify
)

export default userRoutes;