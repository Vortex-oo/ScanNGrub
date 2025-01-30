import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import ownerModel from "../models/owner.model.js";
import { createToken,verifyToken } from "../services/auth.js";


const ownerSignup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        const existingOwner = await ownerModel.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const ownerId = crypto.randomBytes(10).toString('hex');

        const newOwner = new ownerModel({
            name,
            email,
            password: hashedPassword,
            ownerId
        });

        const savedOwner = await newOwner.save();
        const token = createToken(savedOwner);

        return res.status(201).json({
            success: true,
            message: "Owner created successfully",
            owner: {
                name: savedOwner.name,
                email: savedOwner.email,
                ownerId: savedOwner.ownerId
            },
            token
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


const ownerLogin = async (req, res) => {


    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const owner = await ownerModel.findOne({ email });
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isValidPassword = await bcrypt.compare(password, owner.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(owner);
        
        res.cookie('ownerToken', token, { 
            maxAge: 3600000, 
            httpOnly: true, 
            secure: true 
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            owner: {
                name: owner.name,
                email: owner.email,
                ownerId: owner.ownerId
            },
            token: token
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

const ownerVerify = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const token = req.body;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }

    const owner = verifyToken(token);

    if (owner) {
        return res.status(200).json({
            success: true,
            message: "Valid token",
            owner: {
                name: owner.name,
                email: owner.email,
                ownerId: owner.ownerId
            }
        });
    }

    return res.status(400).json({
        success: false,
        message: "Invalid token"
    });
};

export { ownerSignup, ownerLogin, ownerVerify };