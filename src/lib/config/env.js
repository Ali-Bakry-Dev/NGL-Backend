import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URL: z.string().trim().min(1),

    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),

    SMTP_USER: z.string().email(),
    SMTP_PASSWORD: z.string().min(1),

    GOOGLE_CLIENT_ID: z.string().min(1),

    REDIS_HOST: z.string().default("127.0.0.1"),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASSWORD: z.string().optional()
});

const parsed = schema.parse(process.env);

export const env = {
    port: parsed.PORT,

    db: {
        url: parsed.MONGODB_URL
    },

    jwt: {
        accessSecret: parsed.JWT_ACCESS_SECRET,
        refreshSecret: parsed.JWT_REFRESH_SECRET
    },

    email: {
        user: parsed.SMTP_USER,
        password: parsed.SMTP_PASSWORD
    },

    google: {
        clientId: parsed.GOOGLE_CLIENT_ID
    },

    redis: {
        host: parsed.REDIS_HOST,
        port: parsed.REDIS_PORT,
        password: parsed.REDIS_PASSWORD
    }
};