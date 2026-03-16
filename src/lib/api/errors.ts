import { ZodError } from "zod";

import type { ApiErrorCode, ApiErrorDetail, ApiErrorPayload } from "@/types/api";

export class ApiError extends Error {
  constructor(
    public code: ApiErrorCode,
    message: string,
    public status: number,
    public details?: ApiErrorDetail[],
  ) {
    super(message);
  }
}

export function fromZodError(error: ZodError): ApiError {
  return new ApiError("VALIDATION_ERROR", "Dữ liệu đầu vào không hợp lệ", 400, [
    ...error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })),
  ]);
}

export function toApiErrorPayload(error: ApiError): ApiErrorPayload {
  return {
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  };
}
