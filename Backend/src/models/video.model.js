import mongoose from "mongoose";
import { Schema } from "mongoose";


const videoSchema=new Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"]
        },
        
    }
)