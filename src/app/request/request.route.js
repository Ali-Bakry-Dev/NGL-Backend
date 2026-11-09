import { Router } from "express";
import * as requestController from "./request.controller.js";
import { auth } from "../../lib/auth/auth.middleware.js";

const router = Router();

// Create a new identity disclosure request
router.post("/", auth, requestController.createRequest);

// Get all requests addressed to the logged-in user
router.get("/", auth, requestController.getUserRequests);

// Get a specific request
router.get("/:requestId", auth, requestController.getRequest);

// Accept or reject a request
router.patch(
    "/:requestId/respond",
    auth,
    requestController.respondToRequest
);

export default router;