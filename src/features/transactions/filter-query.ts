import { ApiError } from "@/lib/api/errors";
import type { DashboardPeriod, FilterQuery } from "@/types/expense";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function createValidationError(field: keyof FilterQuery, message: string) {
  return new ApiError("VALIDATION_ERROR", "Dữ liệu đầu vào không hợp lệ", 400, [{ field, message }]);
}

function parseDateParam(value: string | null, field: "fromDate" | "toDate") {
  if (value === null) {
    return undefined;
  }

  if (!DATE_PATTERN.test(value)) {
    throw createValidationError(field, "Invalid date");
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw createValidationError(field, "Invalid date");
  }

  return value;
}

function parseKindParam(value: string | null): FilterQuery["kind"] {
  if (value === null) {
    return undefined;
  }

  if (value === "income" || value === "expense" || value === "all") {
    return value;
  }

  throw createValidationError("kind", "Invalid option");
}

function parsePeriodParam(value: string | null): DashboardPeriod | undefined {
  if (value === null) {
    return undefined;
  }

  if (value === "day" || value === "week" || value === "month") {
    return value;
  }

  throw createValidationError("period", "Invalid option");
}

function parseCategoryIdParam(value: string | null) {
  if (value === null) {
    return undefined;
  }

  if (value.length === 0) {
    throw createValidationError("categoryId", "String must contain at least 1 character(s)");
  }

  return value;
}

function parseKeywordParam(value: string | null) {
  if (value === null) {
    return undefined;
  }

  const trimmed = value.trim();
  if (trimmed.length > 100) {
    throw createValidationError("keyword", "String must contain at most 100 character(s)");
  }

  return trimmed || undefined;
}

export function parseFilterQuery(searchParams: URLSearchParams): FilterQuery {
  const fromDate = parseDateParam(searchParams.get("fromDate"), "fromDate");
  const toDate = parseDateParam(searchParams.get("toDate"), "toDate");
  const kind = parseKindParam(searchParams.get("kind"));
  const categoryId = parseCategoryIdParam(searchParams.get("categoryId"));
  const keyword = parseKeywordParam(searchParams.get("keyword"));
  const period = parsePeriodParam(searchParams.get("period"));

  if (fromDate && toDate && fromDate > toDate) {
    throw createValidationError("fromDate", "fromDate must be before or equal to toDate");
  }

  return {
    ...(fromDate ? { fromDate } : {}),
    ...(toDate ? { toDate } : {}),
    ...(kind ? { kind } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(keyword ? { keyword } : {}),
    ...(period ? { period } : {}),
  };
}
