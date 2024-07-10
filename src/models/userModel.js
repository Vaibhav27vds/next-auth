import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,

    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,

    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})


