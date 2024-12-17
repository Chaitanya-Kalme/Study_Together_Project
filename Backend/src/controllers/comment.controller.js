import {Comment} from "../models/comment.model.js"
import { Notes } from "../models/notes.model.js"
import { Video } from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    const {videoId,notesId}=req.params
    const {content}=req.body

    if(!content){
        throw new ApiError(404,"Content is required")
    }
    const user =req.user
    if(!user){
        throw new ApiError(404,"User is not logged in")
    }
    let video,notes;
    if(videoId){
        video= await Video.findById(videoId)
    }
    if(notesId){
        notes = await Notes.findById(notesId)
    }

    const comment = await Comment.create({
        content,
        video,
        notes,
        owner:user
    })


    return res.status(200)
    .json(
        new ApiResponse(200,comment,"Comment Uploaded Successfully")
    )

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId}= req.params
    const {content} = req.body

    if(!content){
        throw new ApiError(404,"Content is required")
    }
    if(!req.user){
        throw new ApiError(400,"User is required to update the comment")
    }
    const comment = await Comment.findByIdAndUpdate(commentId,
        {
            $set:{
                content
            }
        },
        {
            new:true
        }
    )
    if(!comment){
        throw new ApiError(404,"Comment Not found")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,comment,"Comment Updated Successfully"
        )
    )

    
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params

    if(!commentId){
        throw new ApiError(404,"Comment Id Not found")
    }

    if(!req.user){
        throw new ApiError(404,"User must be logged in to delete the commment")
    }

    await Comment.findByIdAndDelete(commentId)

    const comment= await Comment.findById(commentId)
    
    if(comment){
        throw new ApiError(400,"Something went wrong while deleting the Comment")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,"Comment Deleted Successfully")
    )



    
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }