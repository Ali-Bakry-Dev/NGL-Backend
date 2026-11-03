import { AppError } from "../../pkg/error/error.js";

export const userNotFound = () => new AppError("User not found", 404);

export const invalidUserData = () => new AppError("No valid data provided for update", 400);