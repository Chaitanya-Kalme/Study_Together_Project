import { Router } from "express";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router()

router.route("/publishVideo").post(
    upload.fields([
        {
            name:"videoFile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
    verifyJWT,
    publishAVideo
)

router.route("/getVideo/:videoId").get(getVideoById)
router.route("/updateVideo/:videoId").patch(upload.single("thumbnail"),updateVideo)
router.route("/deleteVideo/:videoId").delete(verifyJWT,deleteVideo)
router.route("/getAllVideos").get(getAllVideos)
router.route("/toogle/publish/:videoId").patch(verifyJWT,togglePublishStatus)


export default router

