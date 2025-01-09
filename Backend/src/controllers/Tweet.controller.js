import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Tweet } from "../models/tweet.model.js";
import fs from "fs"

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body
    if(!content){
        throw new ApiError(404,"Content is not found")
    }
    const user = req.user
    if(!user){
        throw new ApiError(400,"User must be logged in to create Tweet")
    }
    const image= req?.file?.filename
    
    const tweet= await Tweet.create({
        content,
        owner:user,
        image
    })
    if(!tweet){
        throw new ApiError(400,"Something went wrong while creating the tweet")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,tweet,"Tweet Created Successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    const {userId} = req.params

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404,"User does not Exist")
    }



})

const updateTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const {content} = req.body
    const image = req?.file?.filename
    if(!content && !image){
        throw new ApiError(404,"Content Or image is required")
    }
    const olderTweet= await Tweet.findById(tweetId);
    if(!olderTweet){
        throw new ApiError(404,"Tweet not found")
    }
    let previousImage;
    const updateFields={}
    if(content){
        updateFields.content=content
    }
    if(image){
        previousImage= olderTweet.image
        updateFields.image=image
    }

    const tweet = await Tweet.findByIdAndUpdate(tweetId,
        {
            $set:updateFields
        },
        {
            new:true
        }
    )

    await fs.promises.unlink(previousImage)
    if(!tweet){
        throw new ApiError(404,"Tweet not found")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,tweet,"Tweet updated successfully")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params

    const tweet= await Tweet.findById(tweetId)
    if(!tweet){
        throw new ApiError(404,"Tweet not found")
    }
    await fs.promises.unlink(tweet.image)

    await tweet.deleteOne()
    return res.status(200)
    .json(
        new ApiResponse(200,"Tweet Deleted Successfully")
    )

    
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}