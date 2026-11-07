import cluster from "node:cluster";
import http from "node:http";
import mongoose from "mongoose";

import { createApp } from "./app.js";
import connectDB from "./lib/db/mongoose.js";
import { env } from "./lib/config/env.js";
import { connectCache, cacheProvider } from "./lib/cache/init.js";

const NUM_WORKERS = 3;
const USE_CLUSTER = process.env.USE_CLUSTER === "true";

async function startServer() {
await connectDB();
await connectCache();

const app = createApp();
const server = http.createServer(app);

server.listen(env.port, () => {
    console.log(
        `Backend process ${process.pid} is running on port ${env.port}`
    );
});

let shuttingDown = false;

async function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`Process ${process.pid} is shutting down...`);

    server.close(async () => {
        await mongoose.disconnect();
        await cacheProvider.quit();
        process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

}

if (USE_CLUSTER && cluster.isPrimary) {
cluster.schedulingPolicy = cluster.SCHED_RR;

console.log(`Master process ${process.pid} is running`);

for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
}

let shuttingDown = false;

cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} exited`);

    if (!shuttingDown) {
        cluster.fork();
    }
});

function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;

    for (const worker of Object.values(cluster.workers)) {
        if (worker) worker.kill();
    }

    setTimeout(() => process.exit(0), 1000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

} else {
await startServer();
}