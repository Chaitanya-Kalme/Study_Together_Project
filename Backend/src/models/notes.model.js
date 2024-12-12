import mongoose, { Schema } from "mongoose";

const notesSchmea=new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        subject:{
            type:String,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        comments:{
            type:Schema.Types.ObjectId,
            ref:"Comment",
        },
        notesFile:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true
    }
)

export const Notes= mongoose.model("Notes",notesSchmea)