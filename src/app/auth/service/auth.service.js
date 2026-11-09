import crypto from "node:crypto";
import { OAuth2Client } from "google-auth-library";

import * as userRepository from "../../user/user.repository.js";
import * as authRepository from "../repository/auth.repository.js";
import * as otpService from "./otp.service.js";

import { hashPassword, comparePassword } from "../utils/hash.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/token.js";

import { sendEmail } from "../../../lib/email/nodemailer.js";
import { verifyAccountTemplate } from "../template/send-email.js";

import { AuthErrors } from "../error.js";
import { AppError } from "../../../pkg/error/error.js";

import { cacheProvider } from "../../../lib/cache/init.js";
import { env } from "../../../lib/config/env.js";

const googleClient = new OAuth2Client(env.google.clientId);

const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60;

// HELPER FUNCTION

async function baseFn(email, code, purpose, callback) {
    const user = await authRepository.checkUserExistByEmail(email);

    if (!user || user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    const otp = await otpService.verifyOTP(email, code, purpose);

    if (!otp) {
        throw AuthErrors.INVALID_OTP();
    }

    const result = await callback(user);

    await otpService.consumeOTP(email, code, purpose);

    return result;
}

// TOKEN GENERATION

async function generateUserTokens(user) {
    const jti = crypto.randomUUID();

    const accessToken = generateAccessToken({
        sub: user._id.toString()
    });

    const refreshToken = generateRefreshToken({
        sub: user._id.toString(),
        jti
    });

    await cacheProvider.set(
        `refreshToken:${jti}`,
        user._id.toString(),
        "EX",
        REFRESH_TOKEN_EXPIRATION
    );

    return {
        accessToken,
        refreshToken
    };
}

// REGISTER

export async function register(userData) {
    const existingUser = await authRepository.checkUserExistByEmail(
        userData.email
    );

    if (existingUser) {
        throw AuthErrors.USER_ALREADY_EXISTS();
    }

    const hashedPassword = await hashPassword(userData.password);

    const createdUser = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
        provider: "local"
    });

    const otp = await otpService.generateOTP(
        createdUser.email,
        "VERIFY_ACCOUNT"
    );

    await sendEmail(
        createdUser.email,
        "Verify Your NGL Account",
        verifyAccountTemplate(otp.code)
    );

    const userResponse = createdUser.toObject();

    delete userResponse.password;

    return userResponse;
}

// RESEND VERIFICATION OTP

export async function resendVerificationOtp(email) {
    const user = await authRepository.checkUserExistByEmail(email);

    if (!user || user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    if (user.isVerified) {
        throw AuthErrors.ACCOUNT_ALREADY_VERIFIED();
    }

    const otp = await otpService.generateOTP(
        email,
        "VERIFY_ACCOUNT"
    );

    await sendEmail(
        email,
        "Verify Your NGL Account",
        verifyAccountTemplate(otp.code)
    );

    return true;
}

// VERIFY ACCOUNT

export async function verifyAccount(email, code) {
    return await baseFn(
        email,
        code,
        "VERIFY_ACCOUNT",
        async (user) => {
            if (user.isVerified) {
                throw AuthErrors.ACCOUNT_ALREADY_VERIFIED();
            }

            return await authRepository.updateUserByEmail(
                email,
                { isVerified: true }
            );
        }
    );
}

// LOGIN

export async function login(email, password) {
    const user = await authRepository.checkUserExistByEmail(email);

    if (!user || user.isDeleted) {
        throw AuthErrors.INVALID_CREDENTIALS();
    }

    if (user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    if (user.provider !== "local" || !user.password) {
        throw new AppError("Please login using Google", 400);
    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        user.failedLoginAttempts += 1;

        if (user.failedLoginAttempts >= 5) {
            user.isBanned = true;
        }

        await user.save();

        if (user.isBanned) {
            throw new AppError(
                "Your account has been banned after 5 failed login attempts",
                403
            );
        }

        throw AuthErrors.INVALID_CREDENTIALS();
    }

    if (!user.isVerified) {
        throw AuthErrors.ACCOUNT_NOT_VERIFIED();
    }

    user.failedLoginAttempts = 0;
    await user.save();

    if (user.twoStepVerification) {
        const otp = await otpService.generateOTP(
            user.email,
            "LOGIN"
        );

        await sendEmail(
            user.email,
            "Login Verification Code",
            verifyAccountTemplate(otp.code)
        );

        return null;
    }

    return await generateUserTokens(user);
}

// SEND PASSWORD RESET OTP

export async function sendOtp(email) {
    const user = await authRepository.checkUserExistByEmail(email);

    if (!user || user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    if (user.provider !== "local" || !user.password) {
        throw new AppError(
            "Google accounts do not use password reset",
            400
        );
    }

    if (!user.isVerified) {
        throw AuthErrors.ACCOUNT_NOT_VERIFIED();
    }

    const otp = await otpService.generateOTP(
        email,
        "RESET_PASSWORD"
    );

    await sendEmail(
        email,
        "Password Reset Code",
        verifyAccountTemplate(otp.code)
    );

    return true;
}

// RESET PASSWORD

export async function resetPassword(email, code, newPassword) {
    return await baseFn(
        email,
        code,
        "RESET_PASSWORD",
        async (user) => {
            if (user.provider !== "local" || !user.password) {
                throw new AppError(
                    "Google accounts do not use password reset",
                    400
                );
            }

            const hashedPassword = await hashPassword(newPassword);

            await userRepository.updateUserByEmail(
                email,
                { password: hashedPassword }
            );

            return true;
        }
    );
}

// REQUEST ENABLE TWO-STEP VERIFICATION

export async function requestEnableTwoStepVerification(email) {
    const user = await authRepository.checkUserExistByEmail(email);

    if (!user || user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    if (!user.isVerified) {
        throw AuthErrors.ACCOUNT_NOT_VERIFIED();
    }

    if (user.twoStepVerification) {
        throw AuthErrors.TWO_STEP_ALREADY_ENABLED();
    }

    const otp = await otpService.generateOTP(
        email,
        "ENABLE_2FA"
    );

    await sendEmail(
        email,
        "Enable Two-Step Verification",
        verifyAccountTemplate(otp.code)
    );

    return true;
}

// ENABLE TWO-STEP VERIFICATION

export async function enableTwoStepVerification(email, code) {
    return await baseFn(
        email,
        code,
        "ENABLE_2FA",
        async (user) => {
            if (user.twoStepVerification) {
                throw AuthErrors.TWO_STEP_ALREADY_ENABLED();
            }

            return await authRepository.updateUserByEmail(
                email,
                { twoStepVerification: true }
            );
        }
    );
}

// VERIFY TO LOGIN

export async function verifyToLogin(email, code) {
    const user = await baseFn(
        email,
        code,
        "LOGIN",
        async (foundUser) => {
            if (!foundUser.isVerified) {
                throw AuthErrors.ACCOUNT_NOT_VERIFIED();
            }

            if (!foundUser.twoStepVerification) {
                throw new AppError(
                    "Two-step verification is not enabled",
                    400
                );
            }

            return foundUser;
        }
    );

    return await generateUserTokens(user);
}

// GOOGLE LOGIN

export async function loginWithGoogle(idToken) {
    let ticket;

    try {
        ticket = await googleClient.verifyIdToken({
            idToken,
            audience: env.google.clientId
        });
    } catch {
        throw AuthErrors.INVALID_GOOGLE_TOKEN();
    }

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
        throw AuthErrors.INVALID_GOOGLE_TOKEN();
    }

    const email = payload.email.toLowerCase();

    let user = await authRepository.checkUserExistByEmail(email);

    if (user && user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user && user.isBanned) {
        throw new AppError("Your account has been banned", 403);
    }

    if (user && user.provider !== "google") {
        throw new AppError(
            "This email is already registered with another provider",
            409
        );
    }

    if (!user) {
        user = await authRepository.createUser({
            name: payload.name,
            email,
            provider: "google",
            profilePic: payload.picture,
            isVerified: true
        });
    }

    return await generateUserTokens(user);
}

// REFRESH TOKEN

export async function refreshTokenFn(oldRefreshToken) {
    let payload;

    try {
        payload = verifyRefreshToken(oldRefreshToken);
    } catch {
        throw new AppError("Invalid or expired refresh token", 401);
    }

    if (!payload.jti || !payload.sub) {
        throw new AppError("Invalid refresh token", 401);
    }

    const storedUserId = await cacheProvider.get(
        `refreshToken:${payload.jti}`
    );

    if (!storedUserId || storedUserId !== payload.sub) {
        throw new AppError("Refresh token revoked or invalid", 401);
    }

    const user = await userRepository.findUserById(payload.sub);

    if (!user || user.isDeleted) {
        throw AuthErrors.USER_NOT_FOUND();
    }

    if (user.isBanned) {
        await cacheProvider.del(`refreshToken:${payload.jti}`);
        throw new AppError("Your account has been banned", 403);
    }

    await cacheProvider.del(`refreshToken:${payload.jti}`);

    return await generateUserTokens(user);
}