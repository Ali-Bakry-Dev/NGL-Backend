import * as userService from "./user.service.js";
import { updateUserProfileDTO } from "./user.dto.js";
import { validateBody } from "../../lib/validation/validation.js";

export async function getUserProfile(req, res, next) {
try {
const user = await userService.getUserProfile(req.params.userId);

    res.status(200).json({
        message: "User profile retrieved successfully",
        success: true,
        data: user
    });
} catch (error) {
    next(error);
}

}

export async function updateUserProfile(req, res, next) {
try {
const validatedData = validateBody(
updateUserProfileDTO,
req.body
);

    const updatedUser = await userService.updateUserProfile(
        req.user.id,
        validatedData
    );

    res.status(200).json({
        message: "User profile updated successfully",
        success: true,
        data: updatedUser
    });
} catch (error) {
    next(error);
}

}

export async function getAllUsers(req, res, next) {
try {
const users = await userService.getAllUsers();

    res.status(200).json({
        message: "Users retrieved successfully",
        success: true,
        data: users
    });
} catch (error) {
    next(error);
}

}

export async function uploadProfilePicture(req, res, next) {
try {
const updatedUser = await userService.uploadProfilePicture(
req.user.id,
req.file
);

    res.status(200).json({
        message: "Profile picture uploaded successfully",
        success: true,
        data: updatedUser
    });
} catch (error) {
    next(error);
}

}