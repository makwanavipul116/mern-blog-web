import mongoose from "mongoose";


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb connected on ${conn.connection.host}`)
    } catch (error) {
        console.log("error in mongo connection", error)
    }
}


export default connectDb;
