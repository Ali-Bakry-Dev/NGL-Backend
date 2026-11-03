import { AppError } from "../../pkg/error/error.js";

export function validateBody(schema, data) {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        const error = new AppError("Validation failed", 400);
        error.details = errors;

        throw error;
    }

    return result.data;
}