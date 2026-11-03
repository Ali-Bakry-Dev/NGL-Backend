import * as messageService from "./message.service.js";
import { sendMessageDTO } from "./message.dto.js";
import { validateBody } from "../../lib/validation/validation.js";

// Send a new message
export async function sendMessage(req, res, next) {
try {
const validatedData = validateBody(
sendMessageDTO,
req.body
);

    const message = await messageService.sendMessage(
        req.user.id,
        validatedData
    );

    res.status(201).json({
        message: "Message sent successfully",
        success: true,
        data: message
    });
} catch (error) {
    next(error);
}

}

// Get my received messages with pagination
export async function getMyMessages(req, res, next) {
try {
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.min(
50,
Math.max(1, parseInt(req.query.limit) || 10)
);

    const result = await messageService.getMyMessages(
        req.user.id,
        page,
        limit
    );

    res.status(200).json({
        message: "Messages retrieved successfully",
        success: true,
        data: result.messages,
        pagination: result.pagination
    });
} catch (error) {
    next(error);
}

}

// Get public messages with pagination
export async function getPublicMessages(req, res, next) {
try {
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.min(
50,
Math.max(1, parseInt(req.query.limit) || 10)
);

    const result = await messageService.getPublicMessages(
        page,
        limit
    );

    res.status(200).json({
        message: "Public messages retrieved successfully",
        success: true,
        data: result.messages,
        pagination: result.pagination
    });
} catch (error) {
    next(error);
}

}

// Delete a message
export async function deleteMessage(req, res, next) {
try {
const result = await messageService.deleteMessage(
req.user.id,
req.params.messageId
);

    res.status(200).json({
        message: result.message,
        success: true
    });
} catch (error) {
    next(error);
}

}