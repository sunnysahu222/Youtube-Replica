import app from './app.js'
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB().then(()=> {
    app.listen(port, ()=> {
        console.log(`app is listening at the port ${port}`)
    })
}).catch((err) => {
    console.log("conncection failed ", err)
})