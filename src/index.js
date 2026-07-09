import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();