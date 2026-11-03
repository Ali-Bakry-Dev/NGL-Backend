import { randomUUID } from "node:crypto";

export function correlationId(req, res, next) {
const incomingId = req.headers["x-correlation-id"];

const isValidUUID =
    typeof incomingId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(incomingId);

const id = isValidUUID ? incomingId : randomUUID();

req.correlationId = id;

res.setHeader("X-Correlation-ID", id);

next();

}