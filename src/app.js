import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));
app.use(express.json({"limit" : "20kb"}));
app.use(express.urlencoded({"extended": true , "limit": "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from './routes/user.routes.js'
app.use('/api/v1/users',userRouter)
app.get('/login',(req,res) => {
    return res.status(201).json({message:"login page "})
})
app.use((err, req, res, next) => {
    return res.status(err.statusCode || err.status || 500).json({
        success: false,
        message: err.message,
        errors: err.errors || []
    });
});
export default app;