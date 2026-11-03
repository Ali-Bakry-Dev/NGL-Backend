import { User } from "./user.model.js";

export async function createUser(userData) {
    return await User.create(userData);
}

export async function findUserByEmail(email) {
    return await User.findOne({
        email: email.toLowerCase()
    });
}

export async function findActiveUserByEmail(email) {
    return await User.findOne({
        email: email.toLowerCase(),
        isDeleted: false
    });
}

export async function findUserById(userId) {
    return await User.findById(userId).select("-password");
}

export async function updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
}

export async function updateUserByEmail(email, updateData) {
    return await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).select("-password");
}

export async function findAllUsers() {
    return await User.find({
        isDeleted: false
    }).select("-password");
}