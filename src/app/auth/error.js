import { AppError } from "../../pkg/error/error.js";

export const AuthErrors = {
USER_ALREADY_EXISTS: () =>
new AppError("User already exists", 409),

USER_NOT_FOUND: () =>
    new AppError("User not found", 404),

INVALID_CREDENTIALS: () =>
    new AppError("Invalid email or password", 401),

INVALID_OTP: () =>
    new AppError("Invalid or expired OTP", 400),

ACCOUNT_NOT_VERIFIED: () =>
    new AppError("Please verify your account first", 403),

ACCOUNT_ALREADY_VERIFIED: () =>
    new AppError("Account is already verified", 400),

ACCOUNT_DELETED: () =>
    new AppError("This account is unavailable", 403),

TWO_STEP_ALREADY_ENABLED: () =>
    new AppError("Two-step verification is already enabled", 400),

TWO_STEP_NOT_ENABLED: () =>
    new AppError("Two-step verification is not enabled", 400),

INVALID_GOOGLE_TOKEN: () =>
    new AppError("Invalid Google token", 401),

GOOGLE_LOGIN_REQUIRED: () =>
    new AppError("Please login using Google", 400),

EMAIL_PROVIDER_CONFLICT: () =>
    new AppError("This email is already registered with another provider", 409),

PASSWORD_RESET_NOT_ALLOWED: () =>
    new AppError("Password reset is not available for this account", 400),

INVALID_REFRESH_TOKEN: () =>
    new AppError("Invalid or expired refresh token", 401),

REFRESH_TOKEN_REVOKED: () =>
    new AppError("Refresh token revoked or invalid", 401)

};