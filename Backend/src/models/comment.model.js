import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema(
    {
        content:{
            type:String,
            required:true,
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        notes:{
            type:Schema.Types.ObjectId,
            ref:"Notes"
        },
        tweet:{
            type:Schema.Types.ObjectId,
            ref:"Tweet",
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {
        timestamps:true
    }
)

export const Comment= mongoose.model("Comment",commentSchema)