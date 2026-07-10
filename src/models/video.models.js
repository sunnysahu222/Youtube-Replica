import mongoose, { MongooseError } from "mongoose";
import { paginate } from "mongoose-paginate-v2";
const VideoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required : true 

    },
    thumbnail: {
        type :String,
        required:true,
    },
     Title: {
        type: String,
        required : true 

    },
     Description: {
        type: String,
        required : true 

    },
     Duration: {
        type: Number,
        required : true 

    },
     Views: {
        type: Number,
        default: 0 

    },
    isPublished: {
        type: Boolean,
        default : true 

    },
    Owner: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamp: true});
VideoSchema.plugin(paginate)
export const Video = mongoose.model("Video",VideoSchema)