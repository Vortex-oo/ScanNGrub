import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
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
    ownerId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const ownerModel = mongoose.model('Owner', ownerSchema);

export default ownerModel;