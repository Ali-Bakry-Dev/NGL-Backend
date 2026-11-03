import { model, Schema } from "mongoose";

const otpSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 6
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        purpose: {
            type: String,
            required: true,
            enum: [
                "VERIFY_ACCOUNT",
                "RESET_PASSWORD",
                "LOGIN",
                "ENABLE_2FA"
            ]
        },
        expiresAt: {
            type: Date,
            required: true,
            index: { expires: 0 }
        }
    },
    { timestamps: true }
);

export const OTP = model("OTP", otpSchema);