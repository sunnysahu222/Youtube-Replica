import mongoose from "mongoose";
import   jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
    {
        username :{
            type: String,
            required: true , 
            unique: true , 
            lowercase: true , 
            trim: true, 
            indexe: true ,
        },
        email:{
            type: String,
            required: true , 
            unique: true , 
            lowercase: true , 
            trim: true ,
        },
        fullname :{
            type: String,
            required: true , 
            indexe: true ,
        },
        avatar:{
            type: String, // cloudinary 
            required: true , 
        },
        coverimage:{
            type: String, // cloudinary 

        },
        watchhistory:[{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }],
        password: {
            type: String,
            required: [true,"password is required"]
        },
        refreshToken: {
            type: String

        },

    },{timestamp: true }) ;
    UserSchema.pre("save",async function (next){
        if(!this.isModified) return  next();
         this.password = await bcrypt.hash(this.password,10)
        next();    })
    UserSchema.methods.ispasswordverified = async function( password) {
        return await bcrypt.compare(password,this.password)
        
    }    
    UserSchema.methods.generateUserToken = function (){
        return jwt.sign(
            {
                _id: this._id,
                username: this.username,
                email:this.email,
                fullname: this.fullname
            },process.env.JWT_SECRET_GENERATE_TOKEN_KEY,{expiresIn:process.env.JWT_SECRET_TOKEN_KEY_EXPIRY}
        )
    }
        UserSchema.methods.refreshUserToken = function (){
        jwt.sign(
            {
                _id: this._id,
            },process.env.JWT_SECRET_REFRESH_TOKEN_KEY,{expiresIn:process.env.JWT_SECRET_REFRESH_TOKEN_KEY_EXPIRY}
        )
    }



export const User = mongoose.model("User",UserSchema)// in mongodb it will saves as Users // plural and lower case 
