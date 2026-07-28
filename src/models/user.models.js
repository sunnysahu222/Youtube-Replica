import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        fullname: {
            type: String,
            required: true,
            index: true
        },

        avatar: {
            type: String,
            required: true
        },

        coverimage: {
            type: String
        },

        watchhistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, "Password is required"]
        },

        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.JWT_SECRET_GENERATE_TOKEN_KEY,
        {
            expiresIn: process.env.JWT_SECRET_TOKEN_KEY_EXPIRY
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET_REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_KEY_EXPIRY
        }
    );
};

export const User = mongoose.model("User", UserSchema);