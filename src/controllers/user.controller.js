import { asynchandler } from "../utils/asynchandler.js";
export const registerUser = asynchandler(async(req,res) => {
     return res.status(201).json({message : "ok"})
});

export const getallusers = asynchandler(async(req,res)=>{
     return res.status(201).json({message : "all users are here"})
})