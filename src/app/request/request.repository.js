import Request from "./request.model.js";

class RequestRepository {
    async createRequest(requestData) {
        return await Request.create(requestData);
    }

    async findById(requestId) {
        return await Request.findById(requestId)
            .populate(
                "message",
                "content receiver isAnonymous isPublic isDeleted"
            )
            .populate("requester", "name profilePic");
    }

    async findByMessageAndRequester(messageId, requesterId) {
        return await Request.findOne({
            message: messageId,
            requester: requesterId
        });
    }

    async findUserRequests(userId, filter = {}) {
        return await Request.find({
            targetUser: userId,
            ...filter
        })
            .populate(
                "message",
                "content receiver isAnonymous isPublic isDeleted"
            )
            .populate("requester", "name profilePic")
            .sort({ createdAt: -1 });
    }

    async updateStatus(requestId, status) {
        return await Request.findByIdAndUpdate(
            requestId,
            {
                status,
                respondedAt: new Date()
            },
            {
                new: true,
                runValidators: true
            }
        )
            .populate(
                "message",
                "content receiver isAnonymous isPublic isDeleted"
            )
            .populate("requester", "name profilePic");
    }

    async deleteRequest(requestId) {
        return await Request.findByIdAndDelete(requestId);
    }
}

export default new RequestRepository();