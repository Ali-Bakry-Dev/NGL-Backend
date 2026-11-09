import { z } from "zod";

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createRequestDTO = z.object({
    body: z.object({
        message: objectIdSchema
    })
});

export const respondToRequestDTO = z.object({
    params: z.object({
        requestId: objectIdSchema
    }),
    body: z.object({
        status: z.enum(["accepted", "rejected"])
    })
});

export const getRequestDTO = z.object({
    params: z.object({
        requestId: objectIdSchema
    })
});