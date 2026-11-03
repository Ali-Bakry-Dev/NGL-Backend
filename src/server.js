import { createApp } from "./app.js";
import http from "node:http";
import mongoose from "mongoose";
import connectDB from "./lib/db/mongoose.js";
import { env } from "./lib/config/env.js";
import { connectCache, cacheProvider } from "./lib/cache/init.js";

await connectDB();
await connectCache();

const app = createApp();

const server = http.createServer(app);

server.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});

function shutdown() {
    server.close(async () => {
        await mongoose.disconnect();
        await cacheProvider.quit();
        process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);