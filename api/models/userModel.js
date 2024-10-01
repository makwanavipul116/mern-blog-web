import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocIs68P5rt5mF_P2Ff2ZoBMeQzkFdsd7qxSqMkO1mzR5eAEzCg=s96-c"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const User = mongoose.model('USER', userSchema)

export default User