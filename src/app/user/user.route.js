import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../lib/auth/auth.middleware.js";
import { uploadFile } from "../../lib/multer/multer.js";
import { fileValidation } from "../../lib/multer/file.validator.js";

const router = Router();

router.get("/users", auth, userController.getAllUsers);

router.get("/profile/:userId", auth, userController.getUserProfile);

router.patch("/profile", auth, userController.updateUserProfile);

router.patch(
    "/profile/picture",
    auth,
    uploadFile().single("profilePic"),
    fileValidation(),
    userController.uploadProfilePicture
);

export default router;