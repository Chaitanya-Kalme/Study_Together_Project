import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notes} from "../models/nodes.model.js";
import fs from "fs"


const uploadNotes= asyncHandler(async (req,res)=>{
    const {name,subject}=req.body

    if(!name || !subject){
        throw new ApiError(404,"name or subject is required")
    }

    const notesFile=req?.file?.path
    if(!notesFile){
        throw new ApiError(404,"Notes File is required")
    }
    const user = req.user
    if(!user){
        throw new ApiError(404,"User is not found")
    }

    const notes= await Notes.create({
        name,
        subject,
        owner:user,
        notesFile
    })

    if(!notes){
        throw new ApiError(500,"Something went wrong while uploading Notes")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,notes,"Notes Uploaded Successfully")
    )
})

const deleteNotes =asyncHandler(async (req,res) =>{
    const {notesId} = req.params
    console.log(req.params)

    const notes = await Notes.findById(notesId)

    if(!notes){
        throw new ApiError(404,"Notes not found")
    }
    
    try {
        await notes.deleteOne()
        await fs.promises.unlink(notes.notesFile)
        
    } catch (error) {
        throw new ApiError(400,"Something went wrong while deleting the notes")
        
    }

    return res.status(200).
    json(
        new ApiResponse(200,"Notes Deleted Successfully")
    )
    
})


export {
    uploadNotes,
    deleteNotes
}