import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

export default userModel;