import { cookie, validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import {createToken, verifyToken } from "../services/auth.js";
import { createResponse } from "../crossResponse.js";

const userSignup = async (req, res) => {
    try {
        // Validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password, name } = req.body;

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = crypto.randomBytes(10).toString('hex');

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            userId
        });

        // Save user to database
        const savedUser = await newUser.save();

        const token = createToken(savedUser);

        res.cookie('userToken', token, { maxAge: 3600000, httpOnly: true, secure: true });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                name: savedUser.name,
                email: savedUser.email,
                userId: savedUser.userId
            },
            token:token
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const userLogin = async (req, res) => {
    try {
        // Validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = createToken(user);
        
        // Set cookie
        res.cookie('userToken', token, { 
            maxAge: 3600000, 
            httpOnly: true, 
            secure: true 
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                userId: user.userId
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


const userVerify = async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty) {
        return res.status(400).json({
            success: false,
            errors:errors.array()
        })
    }

    const token = req.body

    if (!token) {
        return res.status(400).json({msg:"invalid token"})
    }

    const user= verifyToken(token)

    if (user) {
        return createResponse(200).json({
            msg:"valid token"
        })
    }
}

export { userSignup, userLogin,userVerify };