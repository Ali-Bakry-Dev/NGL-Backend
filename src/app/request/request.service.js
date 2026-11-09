import requestRepository from "./request.repository.js";
import { Message } from "../message/message.model.js";
import { AppError } from "../../pkg/error/error.js";

class RequestService {
    async createRequest(requestData) {
        const { message: messageId, requester } = requestData;

        const message = await Message.findById(messageId);

        if (!message || message.isDeleted) {
            throw new AppError("Message not found", 404);
        }

        if (message.receiver.toString() !== requester.toString()) {
            throw new AppError(
                "You are not authorized to request this message",
                403
            );
        }

        if (!message.isAnonymous || !message.sender) {
            throw new AppError(
                "This message does not have a hidden sender identity",
                400
            );
        }

        const existingRequest =
            await requestRepository.findByMessageAndRequester(
                messageId,
                requester
            );

        if (existingRequest?.status === "pending") {
            throw new AppError(
                "A pending request already exists",
                409
            );
        }

        if (existingRequest) {
            throw new AppError(
                "You have already requested this message",
                409
            );
        }

        return await requestRepository.createRequest({
            message: messageId,
            requester,
            targetUser: message.sender
        });
    }

    async getRequest(requestId, userId) {
        const request = await requestRepository.findById(requestId);

        if (!request) {
            throw new AppError("Request not found", 404);
        }

        const isRequester =
            request.requester?._id.toString() === userId.toString();

        const isTargetUser =
            request.targetUser.toString() === userId.toString();

        if (!isRequester && !isTargetUser) {
            throw new AppError(
                "You are not authorized to view this request",
                403
            );
        }

        // Reveal sender identity only to the requester after acceptance.
        if (isRequester && request.status === "accepted") {
            const message = await Message.findById(request.message._id)
                .select("sender");

            return {
                ...request.toObject(),
                revealedSender: message?.sender || null
            };
        }

        return request;
    }

    async getUserRequests(userId) {
        return await requestRepository.findUserRequests(userId);
    }

    async respondToRequest(requestId, userId, status) {
        const request = await requestRepository.findById(requestId);

        if (!request) {
            throw new AppError("Request not found", 404);
        }

        if (request.targetUser.toString() !== userId.toString()) {
            throw new AppError(
                "You are not authorized to respond to this request",
                403
            );
        }

        if (request.status !== "pending") {
            throw new AppError(
                "This request has already been handled",
                400
            );
        }

        if (!["accepted", "rejected"].includes(status)) {
            throw new AppError("Invalid request status", 400);
        }

        return await requestRepository.updateStatus(requestId, status);
    }
}

export default new RequestService();