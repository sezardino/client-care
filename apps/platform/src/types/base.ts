import { ZodFormatError } from "@/utils/zod";

export type CustomError = { message: string };

export type ServerActionError = CustomError & { errors?: ZodFormatError[] };

export type ServerActionResponse<T = void> = T | ServerActionError;

export type SuccessResponse = { success: true };

export type PaginationRequest = {
  page?: number;
  limit?: number;
};

export type PaginationMeta = {
  totalPages: number;
  page: number;
  limit: number;
  count: number;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
