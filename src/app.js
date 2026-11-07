import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import router from "./route.js";
import { globalErrorHandler } from "./pkg/error/error-handler.js";
import { correlationId } from "./lib/correlation-id/correlation-id.middleware.js";
import { globalRateLimit } from "./lib/rate-limit/rate-limit.middleware.js";

export function createApp() {
const app = express();

// Correlation ID
app.use(correlationId);

// Global Rate Limiting
app.use(globalRateLimit);

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "NGL Backend is running",
        success: true,
        instance: {
            port: process.env.PORT || 3000,
            pid: process.pid
        }
    });
});

app.use("/api", router);

// Global Error Handler
app.use(globalErrorHandler);

return app;

} 