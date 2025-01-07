import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createTweet, deleteTweet, updateTweet } from "../controllers/Tweet.controller.js";

const router =Router()

router.route("/createTweet").post(verifyJWT,upload.single("image"),createTweet)
router.route("/updateTweet/:tweetId").patch(verifyJWT,upload.single("image"),updateTweet)
router.route("/deleteTweet/:tweetId").delete(verifyJWT,deleteTweet)


export default router