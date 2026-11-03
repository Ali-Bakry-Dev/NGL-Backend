import { OTP } from "../model/otp.model.js";

export async function createOTP(otpData) {
    return await OTP.create(otpData);
}

export async function findOTP(email, code, purpose) {
    return await OTP.findOne({
        email: email.toLowerCase(),
        code,
        purpose,
        expiresAt: { $gt: new Date() }
    });
}

export async function deleteOTP(email, purpose) {
    return await OTP.deleteMany({
        email: email.toLowerCase(),
        purpose
    });
}

export async function deleteOTPById(otpId) {
    return await OTP.findByIdAndDelete(otpId);
}