import mongoose from "mongoose";
import { Schema } from "mongoose";


const videoSchema=new Schema(
    {
        title:{
            type:String,
            required:[true,"Name is required"]
        },
        videoFile:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
        },
        views:{
            type:Number,
            default:0
        },
        isPublicAvailable:{
            type:Boolean,
            required:true,
            default:true
        },
    },
    {
        timestamps:true
    }
)

export const Video= mongoose.model("Video",videoSchema)