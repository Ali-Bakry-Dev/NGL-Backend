import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { cacheProvider } from "../cache/init.js";

const redisStore = new RedisStore({
prefix: "ngl:rate-limit:",
sendCommand: (command, ...args) =>
cacheProvider.call(command, ...args),
});

export const globalRateLimit = rateLimit({
windowMs: 15 * 60 * 1000,
limit: 100,
standardHeaders: "draft-8",
legacyHeaders: false,
store: redisStore,
message: {
success: false,
message: "Too many requests. Please try again later.",
},
});