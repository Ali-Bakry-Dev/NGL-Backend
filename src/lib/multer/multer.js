import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import { AppError } from "../../pkg/error/error.js";

const uploadDirectory = path.resolve("uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`;
        cb(null, uniqueName);
    }
});

export const uploadFile = (
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
) => {
    return multer({
        storage,
        limits: {
            fileSize: 5 * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new AppError("Invalid file format", 400));
            }

            cb(null, true);
        }
    });
};