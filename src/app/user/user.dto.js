import { z } from "zod";

export const updateUserProfileDTO = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must not exceed 20 characters")
        .trim()
        .optional(),

    profilePic: z.string()
        .min(1, "Profile picture is required")
        .optional()
}).refine(
    (data) => data.name !== undefined || data.profilePic !== undefined,
    {
        message: "At least one field is required"
    }
);