import * as userRepository from "../../user/user.repository.js";

export async function checkUserExistByEmail(email) {
    return await userRepository.findUserByEmail(email);
}

export async function createUser(userData) {
    return await userRepository.createUser(userData);
}

export async function updateUserByEmail(email, updateData) {
    return await userRepository.updateUserByEmail(email, updateData);
}