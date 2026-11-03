import jwt from "jsonwebtoken";
import { env } from "../../../lib/config/env.js";

const ACCESS_TOKEN_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export function generateAccessToken(payload) {
    return jwt.sign(
        payload,
        env.jwt.accessSecret,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
}

export function generateRefreshToken(payload) {
    return jwt.sign(
        payload,
        env.jwt.refreshSecret,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
}

export function verifyAccessToken(token) {
    return jwt.verify(token, env.jwt.accessSecret);
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, env.jwt.refreshSecret);
}