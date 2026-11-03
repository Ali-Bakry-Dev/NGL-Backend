import { z } from "zod";

export const registerDTO = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must not exceed 20 characters")
        .trim(),

    email: z.string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
});

export const loginDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(1, "Password is required")
});

export const verifyAccountDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    code: z.string().length(6, "OTP must be 6 digits")
});

export const resetPasswordDTO = z.object({
    email: z.string().email().toLowerCase().trim(),
    code: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(6, "Password must be at least 6 characters")
});

export const googleLoginDTO = z.object({
    idToken: z.string().min(1, "Google ID token is required")
});

export const sendOtpDTO = z.object({
    email: z.string().email().toLowerCase().trim()
});