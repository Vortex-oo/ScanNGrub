import express from 'express'
import { body } from "express-validator";
import { ownerLogin, ownerSignup, ownerVerify } from '../controllers/owner.controller.js';



const ownerRoute = express.Router()

ownerRoute.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters long')
], ownerSignup);



ownerRoute.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 8 characters'),
],ownerLogin)

ownerRoute.post('/verify',[
    body('token').isLength({ min: 1 }).withMessage('Token is required'),
],ownerVerify)

export default ownerRoute;