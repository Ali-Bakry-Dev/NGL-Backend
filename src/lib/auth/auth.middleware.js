import { AppError } from "../../pkg/error/error.js";
import { verifyAccessToken } from "../../app/auth/utils/token.js";

export function auth(req, res, next) {
    try {
        const token = req.cookies?.access_token;

        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

        const decoded = verifyAccessToken(token);

        if (!decoded.sub) {
            throw new AppError("Invalid access token", 401);
        }

        req.user = {
            id: decoded.sub
        };

        next();
    } catch (error) {
        next(
            error instanceof AppError
                ? error
                : new AppError("Invalid or expired access token", 401)
        );
    }
}