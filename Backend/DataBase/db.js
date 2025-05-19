import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBUrl = process.env.MONGODB_URI || 'mongodb://mongodb:27017/qrdb';

const connectDB = async () => {
    try {
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
};

export default connectDB;