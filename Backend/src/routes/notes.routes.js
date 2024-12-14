import { Router } from "express";
import { deleteNotes, getNotes, uploadNotes } from "../controllers/notes.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router()

router.route("/uploadNotes").post(upload.single("notesFile"),verifyJWT,uploadNotes)
router.route("/deleteNotes/:notesId").delete(verifyJWT,deleteNotes)
router.route("/getNotes/:notesId").get(getNotes)


export default router
