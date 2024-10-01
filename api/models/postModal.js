import mongoose from "mongoose";


export const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://lh3.googleusercontent.com/a/ACg8ocIs68P5rt5mF_P2Ff2ZoBMeQzkFdsd7qxSqMkO1mzR5eAEzCg=s96-c"
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },

}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

export default Post