import { Router } from "express";
import * as messageController from "./message.controller.js";
import { auth } from "../../lib/auth/auth.middleware.js";
import { idempotency } from "../../lib/idempotency/idempotency.middleware.js";

const router = Router();

// Send a message
router.post(
"/",
auth,
idempotency,
messageController.sendMessage
);

// Get my received messages
router.get(
"/my-messages",
auth,
messageController.getMyMessages
);

// Get public messages
router.get(
"/public",
messageController.getPublicMessages
);

// Delete a message
router.delete(
"/:messageId",
auth,
messageController.deleteMessage
);

export default router;