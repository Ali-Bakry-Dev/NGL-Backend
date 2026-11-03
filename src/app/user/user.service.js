import * as userRepository from "./user.repository.js";
import { userNotFound, invalidUserData } from "./user.error.js";

export async function getUserProfile(userId) {
const user = await userRepository.findUserById(userId);

if (!user || user.isDeleted) {
    throw userNotFound();
}

return user;

}

export async function updateUserProfile(userId, updateData) {
const allowedUpdates = {};

if (updateData.name !== undefined) {
    allowedUpdates.name = updateData.name;
}

if (updateData.profilePic !== undefined) {
    allowedUpdates.profilePic = updateData.profilePic;
}

if (Object.keys(allowedUpdates).length === 0) {
    throw invalidUserData();
}

const updatedUser = await userRepository.updateUser(
    userId,
    allowedUpdates
);

if (!updatedUser || updatedUser.isDeleted) {
    throw userNotFound();
}

return updatedUser;

}

export async function getAllUsers() {
return await userRepository.findAllUsers();
}

export async function uploadProfilePicture(userId, file) {
if (!file) {
throw invalidUserData();
}

const user = await userRepository.findUserById(userId);

if (!user || user.isDeleted) {
    throw userNotFound();
}

const updatedUser = await userRepository.updateUser(userId, {
    profilePic: `/uploads/${file.filename}`
});

if (!updatedUser) {
    throw userNotFound();
}

return updatedUser;

}