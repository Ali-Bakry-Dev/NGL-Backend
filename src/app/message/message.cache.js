import { cacheProvider } from "../../lib/cache/init.js";

const CACHE_TTL = 60;

// Get cached data
export async function getCachedMessages(key) {
try {
const cachedData = await cacheProvider.get(key);

    if (!cachedData) {
        return null;
    }

    return JSON.parse(cachedData);
} catch (error) {
    console.error("Redis cache read error:", error.message);
    return null;
}

}

// Save data in cache
export async function setCachedMessages(key, data) {
try {
await cacheProvider.set(
key,
JSON.stringify(data),
"EX",
CACHE_TTL
);
} catch (error) {
console.error("Redis cache write error:", error.message);
}
}

// Delete message cache
export async function invalidateMessageCache() {
try {
const keys = await cacheProvider.keys("message:*");

    if (keys.length > 0) {
        await cacheProvider.del(...keys);
    }
} catch (error) {
    console.error("Redis cache invalidation error:", error.message);
}

}