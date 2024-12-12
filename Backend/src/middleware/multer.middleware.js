import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {  
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique filename suffix
        const extname = path.extname(file.originalname); // Extract the file extension from the original file name
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
  })
  
export const upload = multer({ 
    storage: storage 
})