import { ZodFormatError } from "@/utils/zod";

export type CustomError = { message: string };

export type ServerActionError = CustomError & { errors?: ZodFormatError[] };

export type ServerActionResponse<T = void> = T | ServerActionError;

export type SuccessResponse = { success: true };
