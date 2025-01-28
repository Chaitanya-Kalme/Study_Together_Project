import { changePassword, deleteUser, getAllColleges, getCurrentUser, loginUser, logOutUser, refreshAccessToken, registerUser, removeAvatar, removeCollege, updateAvatar, updateCurrentUserDetails } from "../controllers/user.controller.js";
import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js";

const router= Router()

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)


router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/refreshToken").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changePassword);
router.route("/getCurrentUser").get(verifyJWT,getCurrentUser);
router.route("/updateDetails").patch(verifyJWT,updateCurrentUserDetails)
router.route("/updateAvatar").post(verifyJWT,upload.single("avatar"),updateAvatar);
router.route("/removeAvatar").delete(verifyJWT,removeAvatar)
router.route("/deleteUser/:Id").delete(verifyJWT,deleteUser)
router.route("/removeCollege").delete(verifyJWT,removeCollege)
router.route("/getAllColleges").get(getAllColleges)

export default router