import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurantModel',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Menu item name is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        available: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);


const menuModel = mongoose.model('MenuItem', menuItemSchema);

export default menuModel;