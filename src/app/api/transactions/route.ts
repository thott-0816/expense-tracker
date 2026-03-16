import { parseFilterQuery } from "@/features/transactions/filter-query";
import { listFilteredTransactions } from "@/features/transactions/transaction-search.service";
import { transactionService } from "@/features/transactions/transaction.service";
import { fromZodError } from "@/lib/api/errors";
import { created, handleRouteError, ok } from "@/lib/api/responses";
import { createTransactionSchema } from "@/lib/validation/transaction";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseFilterQuery(searchParams);
    const result = await listFilteredTransactions(parsed);
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
    return created(transaction);
  } catch (error) {
    return handleRouteError(error);
  }
}
