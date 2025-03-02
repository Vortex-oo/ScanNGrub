import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: String,
            required: true
        },
        ownerId: {
            type: String,
            required: true,
            ref: 'Owner'
        },

        name: {
            type: String,
            required: [true, 'Restaurant name is required'],
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        contactNumber: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid contact number!`,
            },
        },
        upiId:{
            type:String,
            trim:true,
            required:true
        }, 
        QrCode: {
            type: String,
            default: null,
        },
        menuItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MenuItem',
            },
        ],
    },
    {
        timestamps: true,
    }
);


const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default restaurantModel;
