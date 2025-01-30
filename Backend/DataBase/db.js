import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBUrl = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        if (!mongoDBUrl) {
            throw new Error('MONGODB_URL environment variable is not defined');
        }

        // Updated options without deprecated fields
        const options = {
            serverSelectionTimeoutMS: 5000,
            retryWrites: true
        };

        await mongoose.connect(mongoDBUrl, options);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });
};

export default connectDB;