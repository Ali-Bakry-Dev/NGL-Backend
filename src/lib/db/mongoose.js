import mongoose from "mongoose";
import { env } from "../config/env.js";

async function connectDB() {
    try {
        await mongoose.connect(env.db.url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;