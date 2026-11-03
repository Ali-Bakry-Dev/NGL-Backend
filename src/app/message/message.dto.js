import { z } from "zod";

export const sendMessageDTO = z.object({
receiver: z.string()
.regex(/^[0-9a-fA-F]{24}$/, "Invalid receiver ID"),

content: z.string()
    .trim()
    .min(1, "Message content is required")
    .max(2000, "Message must not exceed 2000 characters"),

isAnonymous: z.boolean().optional().default(true),

isPublic: z.boolean().optional().default(false)

});