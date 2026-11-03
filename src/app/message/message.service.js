import * as messageRepository from "./message.repository.js";
import * as userRepository from "../user/user.repository.js";
import * as messageCache from "./message.cache.js";
import { AppError } from "../../pkg/error/error.js";

// Send a new message
export async function sendMessage(senderId, messageData) {
const receiver = await userRepository.findUserById(
messageData.receiver
);

if (!receiver || receiver.isDeleted) {
    throw new AppError("Receiver not found", 404);
}

if (senderId.toString() === receiver._id.toString()) {
    throw new AppError("You cannot send a message to yourself", 400);
}

const message = await messageRepository.createMessage({
    sender: senderId,
    receiver: messageData.receiver,
    content: messageData.content,
    isAnonymous: messageData.isAnonymous,
    isPublic: messageData.isPublic
});

await messageCache.invalidateMessageCache();

return message;

}

// Get my received messages with pagination and caching
export async function getMyMessages(userId, page = 1, limit = 10) {
const cacheKey = "message:my:${userId}:${page}:${limit}";

const cachedData = await messageCache.getCachedMessages(cacheKey);

if (cachedData) {
    return cachedData;
}

const skip = (page - 1) * limit;

const [messages, totalMessages] = await Promise.all([
    messageRepository.findMessagesByReceiver(userId, skip, limit),
    messageRepository.countMessagesByReceiver(userId)
]);

const formattedMessages = messages.map((message) => {
    const messageData = message.toObject();

    if (message.isAnonymous) {
        delete messageData.sender;
    }

    return messageData;
});

const result = {
    messages: formattedMessages,
    pagination: {
        currentPage: page,
        limit,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit)
    }
};

await messageCache.setCachedMessages(cacheKey, result);

return result;

}

// Get public messages with pagination and caching
export async function getPublicMessages(page = 1, limit = 10) {
const cacheKey = "message:public:${page}:${limit}";

const cachedData = await messageCache.getCachedMessages(cacheKey);

if (cachedData) {
    return cachedData;
}

const skip = (page - 1) * limit;

const [messages, totalMessages] = await Promise.all([
    messageRepository.findPublicMessages(skip, limit),
    messageRepository.countPublicMessages()
]);

const formattedMessages = messages.map((message) => {
    const messageData = message.toObject();

    if (message.isAnonymous) {
        delete messageData.sender;
    }

    delete messageData.receiver;

    return messageData;
});

const result = {
    messages: formattedMessages,
    pagination: {
        currentPage: page,
        limit,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit)
    }
};

await messageCache.setCachedMessages(cacheKey, result);

return result;

}

// Delete a message
export async function deleteMessage(userId, messageId) {
const message = await messageRepository.findMessageById(messageId);

if (!message) {
    throw new AppError("Message not found", 404);
}

if (message.receiver.toString() !== userId.toString()) {
    throw new AppError(
        "You are not allowed to delete this message",
        403
    );
}

await messageRepository.deleteMessage(messageId);

await messageCache.invalidateMessageCache();

return { message: "Message deleted successfully" };

}