import { Router } from "express";

import {
    register,
    resendVerificationOtp,
    verifyAccount,
    login,
    sendOtp,
    resetPassword,
    loginWithGoogle,
    refreshTokenFn,
    requestEnableTwoStepVerification,
    enableTwoStepVerification,
    verifyToLogin
} from "./controller/auth.controller.js";

const router = Router();


// Local Authentication
router.post("/register", register);
router.post("/resend-verification-otp", resendVerificationOtp);
router.post("/verify-account", verifyAccount);
router.post("/login", login);


// Password Reset
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);


// Two-Step Verification
router.post("/request-enable-two-step", requestEnableTwoStepVerification);
router.post("/enable-two-step", enableTwoStepVerification);
router.post("/verify-login", verifyToLogin);


// Google Authentication
router.post("/google", loginWithGoogle);


// Token Management
router.post("/refresh-token", refreshTokenFn);

export default router;