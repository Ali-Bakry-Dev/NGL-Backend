import { cacheProvider } from "../cache/init.js";
import { randomUUID, createHash } from "node:crypto";

const IDEMPOTENCY_TTL = 60 * 60;

function generateRequestHash(req) {
return createHash("sha256")
.update(JSON.stringify(req.body ?? {}))
.digest("hex");
}

export async function idempotency(req, res, next) {
try {
const idempotencyKey = req.headers["idempotency-key"];

    if (
        !idempotencyKey ||
        typeof idempotencyKey !== "string" ||
        !idempotencyKey.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Idempotency-Key header is required"
        });
    }

    if (idempotencyKey.length > 255) {
        return res.status(400).json({
            success: false,
            message: "Idempotency-Key is too long"
        });
    }

    const userId = req.user.id;
    const cacheKey = `idempotency:${userId}:${idempotencyKey}`;
    const requestHash = generateRequestHash(req);
    const requestId = randomUUID();

    const processingData = JSON.stringify({
        status: "processing",
        requestId,
        requestHash
    });

    const cachedResponse = await cacheProvider.get(cacheKey);

    if (cachedResponse) {
        const result = JSON.parse(cachedResponse);

        if (result.requestHash !== requestHash) {
            return res.status(409).json({
                success: false,
                message: "Idempotency-Key was already used with a different request body"
            });
        }

        if (result.status === "processing") {
            return res.status(409).json({
                success: false,
                message: "This request is already being processed"
            });
        }

        return res
            .status(result.statusCode)
            .json(result.body);
    }

    const lockAcquired = await cacheProvider.set(
        cacheKey,
        processingData,
        "EX",
        IDEMPOTENCY_TTL,
        "NX"
    );

    if (lockAcquired !== "OK") {
        return res.status(409).json({
            success: false,
            message: "This request is already being processed"
        });
    }

    const originalJson = res.json.bind(res);

    res.json = function (body) {
        const statusCode = res.statusCode;

        if (statusCode >= 200 && statusCode < 300) {
            return cacheProvider.eval(
                `if redis.call("GET", KEYS[1]) == ARGV[1] then
                    return redis.call("SET", KEYS[1], ARGV[2], "EX", ARGV[3])
                else
                    return 0
                end`,
                1,
                cacheKey,
                processingData,
                JSON.stringify({
                    status: "completed",
                    statusCode,
                    requestHash,
                    body
                }),
                String(IDEMPOTENCY_TTL)
            ).then(() => originalJson(body))
             .catch((error) => {
                 console.error("Idempotency cache error:", error.message);
                 return originalJson(body);
             });
        }

        return cacheProvider.eval(
            `if redis.call("GET", KEYS[1]) == ARGV[1] then
                return redis.call("DEL", KEYS[1])
            else
                return 0
            end`,
            1,
            cacheKey,
            processingData
        ).then(() => originalJson(body))
         .catch((error) => {
             console.error("Idempotency cache error:", error.message);
             return originalJson(body);
         });
    };

    next();
} catch (error) {
    console.error("Idempotency Redis error:", error.message);

    return res.status(503).json({
        success: false,
        message: "Idempotency service is temporarily unavailable. Please try again later."
    });
}

}