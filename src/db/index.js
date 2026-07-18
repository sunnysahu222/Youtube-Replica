import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log(process.env.MONGODB_URL);

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);

        console.log("Connected!");
        console.log(connectionInstance.connection.host);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;