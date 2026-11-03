import * as authService from "../service/auth.service.js";
import { toMs } from "../../../pkg/utils/time/time.js";
import { validateBody } from "../../../lib/validation/validation.js";

import {
    registerDTO,
    loginDTO,
    verifyAccountDTO,
    resetPasswordDTO,
    googleLoginDTO,
    sendOtpDTO
} from "../dto/auth.dto.js";


// Helper: Set Authentication Cookies

function setAuthCookies(res, tokens) {
    res.cookie("access_token", tokens.accessToken, {
        httpOnly: true,
        maxAge: toMs(1, "h"),
        path: "/"
    });

    res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: toMs(7, "days"),
        path: "/api/auth/refresh-token"
    });
}


// REGISTER

export async function register(req, res, next) {
    try {
        const data = validateBody(registerDTO, req.body);

        const createdUser = await authService.register(data);

        res.status(201).json({
            success: true,
            message: "User created successfully. Check your email for the verification code.",
            data: createdUser
        });
    } catch (error) {
        next(error);
    }
}


// RESEND VERIFICATION OTP

export async function resendVerificationOtp(req, res, next) {
    try {
        const data = validateBody(sendOtpDTO, req.body);

        await authService.resendVerificationOtp(data.email);

        res.status(200).json({
            success: true,
            message: "Account verification code sent successfully"
        });
    } catch (error) {
        next(error);
    }
}


// VERIFY ACCOUNT

export async function verifyAccount(req, res, next) {
    try {
        const data = validateBody(verifyAccountDTO, req.body);

        const updatedUser = await authService.verifyAccount(
            data.email,
            data.code
        );

        res.status(200).json({
            success: true,
            message: "Account verified successfully",
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
}


// LOGIN

export async function login(req, res, next) {
    try {
        const data = validateBody(loginDTO, req.body);

        const tokens = await authService.login(
            data.email,
            data.password
        );

        if (!tokens) {
            return res.status(200).json({
                success: true,
                message: "Verification code sent to your email"
            });
        }

        setAuthCookies(res, tokens);

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        next(error);
    }
}


// SEND PASSWORD RESET OTP

export async function sendOtp(req, res, next) {
    try {
        const data = validateBody(sendOtpDTO, req.body);

        await authService.sendOtp(data.email);

        res.status(200).json({
            success: true,
            message: "Password reset code sent successfully"
        });
    } catch (error) {
        next(error);
    }
}


// RESET PASSWORD

export async function resetPassword(req, res, next) {
    try {
        const data = validateBody(resetPasswordDTO, req.body);

        await authService.resetPassword(
            data.email,
            data.code,
            data.newPassword
        );

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        next(error);
    }
}


// REQUEST ENABLE TWO-STEP VERIFICATION

export async function requestEnableTwoStepVerification(req, res, next) {
    try {
        const data = validateBody(sendOtpDTO, req.body);

        await authService.requestEnableTwoStepVerification(data.email);

        res.status(200).json({
            success: true,
            message: "Two-step verification code sent successfully"
        });
    } catch (error) {
        next(error);
    }
}


// ENABLE TWO-STEP VERIFICATION

export async function enableTwoStepVerification(req, res, next) {
    try {
        const data = validateBody(verifyAccountDTO, req.body);

        await authService.enableTwoStepVerification(
            data.email,
            data.code
        );

        res.status(200).json({
            success: true,
            message: "Two-step verification enabled successfully"
        });
    } catch (error) {
        next(error);
    }
}


// VERIFY TO LOGIN

export async function verifyToLogin(req, res, next) {
    try {
        const data = validateBody(verifyAccountDTO, req.body);

        const tokens = await authService.verifyToLogin(
            data.email,
            data.code
        );

        setAuthCookies(res, tokens);

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        next(error);
    }
}


// GOOGLE LOGIN

export async function loginWithGoogle(req, res, next) {
    try {
        const data = validateBody(googleLoginDTO, req.body);

        const tokens = await authService.loginWithGoogle(data.idToken);

        setAuthCookies(res, tokens);

        return res.status(200).json({
            success: true,
            message: "Google login successful"
        });
    } catch (error) {
        next(error);
    }
}


// REFRESH TOKEN

export async function refreshTokenFn(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required"
            });
        }

        const tokens = await authService.refreshTokenFn(refreshToken);

        setAuthCookies(res, tokens);

        return res.status(200).json({
            success: true,
            message: "Tokens refreshed successfully"
        });
    } catch (error) {
        next(error);
    }
}