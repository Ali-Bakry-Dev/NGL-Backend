import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.email.user,
        pass: env.email.password
    }
});

export async function sendEmail(to, subject, html) {
    return await transporter.sendMail({
        from: env.email.user,
        to,
        subject,
        html
    });
}