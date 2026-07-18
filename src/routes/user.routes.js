import { Router } from "express";
import {registerUser,getallusers}  from "../controllers/user.controller.js";
const router = Router()
router.route("/register").post(registerUser)
router.route("/getall").get(getallusers)

export default router