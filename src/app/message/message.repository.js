import { Message } from "./message.model.js";

// Create a new message
export function createMessage(messageData) {
    return Message.create(messageData);
}

// Find an active message by ID
export function findMessageById(messageId) {
    return Message.findOne({
        _id: messageId,
        isDeleted: false
    });
}

// Get received messages with pagination
export function findMessagesByReceiver(receiverId, skip, limit) {
    return Message.find({
        receiver: receiverId,
        isDeleted: false
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
}

// Count received messages
export function countMessagesByReceiver(receiverId) {
    return Message.countDocuments({
        receiver: receiverId,
        isDeleted: false
    });
}

// Get public messages with pagination
export function findPublicMessages(skip, limit) {
    return Message.find({
        isPublic: true,
        isDeleted: false
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
}

// Count public messages
export function countPublicMessages() {
    return Message.countDocuments({
        isPublic: true,
        isDeleted: false
    });
}

// Soft delete a message
export function deleteMessage(messageId) {
    return Message.findOneAndUpdate(
        {
            _id: messageId,
            isDeleted: false
        },
        {
            isDeleted: true
        },
        {
            new: true
        }
    );
}