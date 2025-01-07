import mongoose, { Schema } from "mongoose";

const notesSchmea=new Schema(
    {
        name:{
            type:String,
            required:true,
            index:true
        },
        subject:{
            type:String,
            required:true,
            index:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
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