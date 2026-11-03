import { fileTypeFromFile } from "file-type";
import fs from "node:fs/promises";
import { AppError } from "../../pkg/error/error.js";

export const fileValidation = (
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
) => {
    return async (req, res, next) => {
        try {
            if (!req.file) {
                throw new AppError("No file uploaded", 400);
            }

            const type = await fileTypeFromFile(req.file.path);

            if (!type || !allowedTypes.includes(type.mime)) {
                await fs.unlink(req.file.path);
                throw new AppError("Invalid file type", 400);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};