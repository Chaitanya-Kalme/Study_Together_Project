import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { addComment, deleteComment, updateComment } from "../controllers/comment.controller.js";

const router= Router()

router.route("/commentOnVideo/:videoId?/:notesId?/:tweetId?").post(verifyJWT,addComment)
router.route("/updateComment/:commentId").patch(verifyJWT,updateComment)
router.route("/deleteComment/:commentId").delete(verifyJWT,deleteComment)

export default router