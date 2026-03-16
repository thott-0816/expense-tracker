import { parseFilterQuery } from "@/features/transactions/filter-query";
import { listFilteredTransactions } from "@/features/transactions/transaction-search.service";
import { transactionService } from "@/features/transactions/transaction.service";
import { ApiError, fromZodError } from "@/lib/api/errors";
import { created, handleRouteError, ok } from "@/lib/api/responses";
import { revalidateExpenseData } from "@/lib/cache/revalidate-expense-data";
import { createTransactionSchema } from "@/lib/validation/transaction";

function parsePositiveInt(value: string | null, field: "page" | "pageSize", fallback: number) {
  if (value === null) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new ApiError("VALIDATION_ERROR", "Dữ liệu đầu vào không hợp lệ", 400, [
      { field, message: `${field} must be a positive integer` },
    ]);
  }

  return parsed;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseFilterQuery(searchParams);
    const page = parsePositiveInt(searchParams.get("page"), "page", 1);
    const pageSize = parsePositiveInt(searchParams.get("pageSize"), "pageSize", 10);
    const result = await listFilteredTransactions(parsed, { page, pageSize });
    return ok(result);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = createTransactionSchema.safeParse(payload);
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    const transaction = await transactionService.createTransaction(parsed.data);
    revalidateExpenseData();
    return created(transaction);
  } catch (error) {
    return handleRouteError(error);
  }
}
