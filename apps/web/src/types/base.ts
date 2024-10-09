import { ZodFormatError } from "@/utils/zod";

export type ServerActionError = { message: string; errors?: ZodFormatError[] };

export type ServerActionResponse<T = void> = T | ServerActionError;

export type SuccessResponse = { success: true };
