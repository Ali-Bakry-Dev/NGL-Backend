import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true
        },

        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        targetUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        },

        respondedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate requests for the same message and requester.
requestSchema.index(
    { message: 1, requester: 1 },
    { unique: true }
);

// Retrieve requests addressed to a specific user.
requestSchema.index({ targetUser: 1, status: 1, createdAt: -1 });

const Request = mongoose.model("Request", requestSchema);

export default Request;