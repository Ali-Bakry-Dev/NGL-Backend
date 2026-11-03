import * as otpRepository from "../repository/otp.repository.js";
import { generateOtp } from "../utils/otp.js";

const OTP_EXPIRATION_MINUTES = 5;

export async function generateOTP(email, purpose) {
    const code = generateOtp();

    const expiresAt = new Date(
        Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000
    );

    await otpRepository.deleteOTP(email, purpose);

    const otp = await otpRepository.createOTP({
        code,
        email: email.toLowerCase(),
        purpose,
        expiresAt
    });

    return otp;
}

export async function verifyOTP(email, code, purpose) {
    const otp = await otpRepository.findOTP(
        email,
        code,
        purpose
    );

    if (!otp) return false;

    return otp;
}

export async function consumeOTP(email, code, purpose) {
    const otp = await otpRepository.findOTP(
        email,
        code,
        purpose
    );

    if (!otp) return false;

    await otpRepository.deleteOTPById(otp._id);

    return true;
}