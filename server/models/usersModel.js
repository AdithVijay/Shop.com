const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true 
    }
    // isBlocked: {
    //     type: Boolean,
    //     default: false
    // }, 
    // verified: {
    //     type: Boolean,
    //     default: false
    // }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports= User