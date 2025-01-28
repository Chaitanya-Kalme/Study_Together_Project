import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comment.controller.js";

const router= Router()

router.route("/addComment").post(verifyJWT,addComment)
router.route("/updateComment/:commentId").patch(verifyJWT,updateComment)
router.route("/deleteComment/:commentId").delete(verifyJWT,deleteComment)
router.route("/getComments").get(getComments)

export default router