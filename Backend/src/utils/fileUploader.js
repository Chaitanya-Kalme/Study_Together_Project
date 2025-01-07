import { ApiError } from "./ApiError.js";
import { asyncHandler } from "./asyncHandler.js";
import path from "path"
import { fileURLToPath } from 'url';

const getFile = asyncHandler(async (req,res) =>{
    const filePath = req.params.path;
    
    if(!filePath){
        throw new ApiError(404,"Path is required")
    }
    const __filename = fileURLToPath(import.meta.url);

    // __dirname is the directory of __filename
    const __dirname = path.dirname(__filename).replace("\\src\\utils","");
    const file = path.join(__dirname,'\\public','\\temp',filePath)
    if(!file){
        throw new ApiError(404,"File not found")
    }

    return res.sendFile(file)


})

export default getFile