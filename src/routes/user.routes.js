import { Router } from "express";
import {registerUser,getallusers}  from "../controllers/user.controller.js";
import {upload}from '../middlewares/multer.middlewares.js'
const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount : 1 
        },
        {
            name: "coverimage",
            maxcount : 1
        }
    ]),
    registerUser)
router.route("/getall").get(getallusers)

export default router