import Redis from "ioredis";
import { env } from "../config/env.js";

export const cacheProvider = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    ...(env.redis.password ? { password: env.redis.password } : {}),
    lazyConnect: true,
    maxRetriesPerRequest: 3
});

cacheProvider.on("error", (error) => {
    console.error("Redis connection error:", error.message);
});

cacheProvider.on("ready", () => {
    console.log("Redis connected successfully");
});

export async function connectCache() {
    if (cacheProvider.status === "wait") {
        await cacheProvider.connect();
    }
}