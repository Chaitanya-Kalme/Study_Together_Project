import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import fs from "fs"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, subject,chapter, sortBy, sortType, userId } = req.query

    const videos = await Video.aggregate([
        {
            $match:{
                $and:[
                    {
                        subject:{
                            $regex: subject,
                            $options: "i"
                        }
                    },
                    {
                        title:{
                            $regex:chapter,
                            $options: "i"
                        }
                    },
                    {
                        isPublicAvailable:true
                    }
                ]
            }
        }
    ])

    
    if(!videos){
        throw new ApiError(404,"Videos not found")
    }


    return res.status(200)
    .json(
        new ApiResponse(200,videos,"Videos fetched Successfully")
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description,isPublicAvailable,subject} = req.body
    
    const user= req.user
    if(!user){
        throw new ApiError(404,"User is not logged in")
    }
    const thumbnail= await req?.files?.thumbnail[0]?.filename;
    const videoFile= await req?.files?.videoFile[0]?.filename;

    
    if(!thumbnail){
        throw new ApiError(404,"Thumbnail is required")
    }
    if(!videoFile){
        throw new ApiError(404,"VideoFile is required")
    }
    const videoExist=await Video.find({
        $and:[{user},{thumbnail},{videoFile},{title}]
    })
    
    if(videoExist.length>0){
        throw new ApiError(400,"Video already Exist")
    }
    const video=await Video.create({
        title,
        description,
        videoFile,
        thumbnail,
        owner:user,
        subject,
        isPublicAvailable
    })

    

    if(!video){
        throw new ApiError(400,"Something went wrong while uploading video")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,video,"Video Uploaded Succesfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video= await Video.findById(videoId)

    if(!video){
        throw new ApiError(404,"Video Not Found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,video,"Video Found Successfully")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const {title,description}=req.body

    const thumbnail=req?.file?.path?.replace("public\temp","");
    const video =await Video.findById(videoId)
    

    if(!video){
        throw new ApiError(404,"Video not found")
    }
    
    if(!title && !description && !description){
        throw new ApiError(404,"Title or Description or thumbnail is required to update Video")
    }
    const updateFields={}
    if(title){
        updateFields.title=title
    }
    if(description){
        updateFields.description=description
    }
    if(thumbnail){
        updateFields.thumbnail=thumbnail
        await fs.promises.unlink(video.thumbnail)
    }

    if(!req.user){
        throw new ApiError(404,"User is required to log in to update the video")
    }
    
    const updatedVideo=await Video.findByIdAndUpdate(videoId,
        {
            $set:updateFields,
        },
        {
            new:true
        }
    )

    return res.status(200)
    .json(
        new ApiResponse(200,updatedVideo,"Video Updated Successfully")
    )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    const video=await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video Not Found")
    }

    await fs.promises.unlink(video.thumbnail)
    await fs.promises.unlink(video.videoFile)
    await video.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(200,"Video Deleted Successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    const video=await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video Not Found")
    }
    video.isPublicAvailable=!video.isPublicAvailable;
    await video.save()    

    return res.status(200)
    .json(
        new ApiResponse(200,video,"Public Status Changed Successfully")
    )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}