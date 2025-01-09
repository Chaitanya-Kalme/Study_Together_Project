import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import fs from "fs"


const generateAccessAndRefreshToken= async (userId) =>{
    const user = await User.findById(userId);

    const accessToken= user.generateAccessToken();
    const refreshToken= user.generateRefreshToken();

    user.refreshToken= refreshToken;
    user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
}



const registerUser = asyncHandler( async (req,res) =>{
    const {userName,password,email,college,year}=req.body

    if(email==="" || userName==="" || password ===""){
        throw new ApiError(400,"All fields are Required")
    }
    const existedUser= await User.findOne({email})
    if(existedUser){
        throw new ApiError(400,"User Already Exists.")
    }

    const image = `${userName[0].toUpperCase()}.jpg`
    let avatarLocalPath=req?.file?.filename || image;

    const user = await User.create({
        userName,
        password,
        email,
        avatar: avatarLocalPath,
        college,
        year,
    })
    const createdUser= await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser= asyncHandler(async (req,res) =>{

    const {userName,email,password}= req.body;
    

    if(!userName && !email){
        throw new ApiError(404,"User Name or Email is required")
    }

    const user = await User.findOne({
        $or:[{userName},{email}]
    })

    if(!user){
        throw new ApiError(401,"User is not Registered");
    }

    const isPasswordValid=await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(404,"Password is Incorrect.")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    const options= {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            201,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User Logined Succesfully."
        )
    )
})

const logOutUser= asyncHandler(async (req,res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json( new ApiResponse(200,{},"User Logout Successfully"))
})

const refreshAccessToken= asyncHandler(async (req,res) =>{
    const incomingRefreshToken= req.cookies?.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized Request")
    }
    const decodedMessage= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedMessage._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token")
    }
    if(incomingRefreshToken!==user?.refreshToken){
        throw new ApiError(401,"Refresh Token is used or expired")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const options= {
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{accessToken,refreshToken},"Refresh Token changed Successfully.")
    )
    
})

const changePassword= asyncHandler(async (req,res) =>{
    const {oldPassword,newPassword,confirmPassword}= req.body
    if(newPassword!==confirmPassword){
        throw new ApiError(401,"New Password and Confirm Password does not match")
    }
    const user = await User.findById(req.user._id);
    const PasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!PasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
    }
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Password changed successfully.")
    )
})

const getCurrentUser= asyncHandler(async (req,res) =>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"User fetched Successfully.")
    )
})

const updateCurrentUserDetails= asyncHandler(async (req,res) =>{
    const {fullName,email,college,year}= req.body;
    if(!fullName && !email && !college && !year){
        throw new ApiError(404,"FullName or Email or College or Year is requried.")
    }
    const updateFields={};
    if(fullName){
        updateFields.userName=fullName
    }
    if(email){
        updateFields.email=email
    }
    if(college){
        updateFields.college=college
    }
    if(year){
        updateFields.year=year
    }
    const user = await User.findByIdAndUpdate(req?.user?._id,
        {
            $set:updateFields
        },
        {
            new:false
        }
    ).select("-password -refreshToken")
    if(!user){
        throw new ApiError(404,"User not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,"User Details updated Successfully")
    )
})


const updateAvatar= asyncHandler(async (req,res) =>{
    const avatarLocalPath= req?.file?.filename  

    if(!avatarLocalPath){
        throw new ApiError(404,"Avatar file is not found");
    }
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                avatar:avatarLocalPath
            }
        },
        {
            new:true
        }
    ).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Avatar Updated Successfully.")
    )
})

const removeAvatar = asyncHandler(async (req,res) => {
    const avatarLocalPath= `${req.user.userName[0].toUpperCase()}.jpg`;
    if(req.user?.avatar!=avatarLocalPath){
        await fs.promises.unlink("public\\temp\\"+req.user?.avatar)
    }
    
    await User.findByIdAndUpdate(req.user?._id,
        {
            $set:{
                avatar:avatarLocalPath
            }
        },
        {
            new:true
        }
    ).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Avatar Updated Successfully.")
    )
})




export {registerUser,loginUser,logOutUser,refreshAccessToken,changePassword,updateCurrentUserDetails,updateAvatar,getCurrentUser,removeAvatar}