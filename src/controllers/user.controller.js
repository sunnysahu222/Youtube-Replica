import { asynchandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from '../models/user.models.js'
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const registerUser = asynchandler(async(req,res) => {
     // get all data from frontend 
     // get validation 
     // check if already user exists ( username or email)
     // files 
     // check image aor avatar 
     // upload them to cloudinary  , upload 
     // create a user data -- create user in mongodb
     // remove password respose token filed and password from the response 
     //check for user creation 
     //return res 
     const {username,email,password,fullname} = req.body 
     // console.log("emial" ,email);
     // if(fullname ===""){
     //      throw new ApiError(400,"fullname is required ")
     // }
     if([fullname,email,username,password].some((filed) => filed?.trim() === "")){
          throw new ApiError(400,"all fields are required")
     }
     // if(!email.includes("@")){
     //      return res.json({message:"email format should be correct"});
     // }
     const existingUser = User.findOne({
          $or : [{username} ,{email}]
     })
     if(existingUser){
          throw new ApiError(409,"user already exists")
     }
     const AvatarLocalPath = req.files?.avatar[0].path
     const CoverImagePath = req.files?.coverimage[0].path
     if(!AvatarLocalPath) throw new ApiError(400,"avatar is required");
     console.log(req.files());
     const avatar = await cloudinaryUpload(AvatarLocalPath)
     const coverimage = await cloudinaryUpload(CoverImagePath)
     if(!avatar) throw new ApiError(400,"avatar is required ");
     // create the user 
     const user = User.create({fullname,
          avatar : avatar.url,
          coverImage : coverimage?.url || "",
          email,
          password,
          username :username.toLowerCase(),


})
// check the user is exists or not 
const createdUser = await User.findById(user._id).select("-password -refreshToken")
// - sign to remove from the accessing data 
if(!createdUser){
     throw new ApiError(500,"user not found")
}

     return res.status(200).json(new ApiResponse(200,createdUser,"user registered successfully"));
});