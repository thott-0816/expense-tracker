import { transactionService } from "@/features/transactions/transaction.service";
import { revalidateExpenseData } from "@/lib/cache/revalidate-expense-data";
import { fromZodError } from "@/lib/api/errors";
import { handleRouteError, noContent, ok } from "@/lib/api/responses";
import { updateTransactionSchema } from "@/lib/validation/transaction";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = await request.json();
    const parsed = updateTransactionSchema.safeParse(payload);
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    const transaction = await transactionService.updateTransaction(id, parsed.data);
    revalidateExpenseData();
    return ok(transaction);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await transactionService.deleteTransaction(id);
    revalidateExpenseData();
    return noContent();
  } catch (error) {
    return handleRouteError(error);
  }
}
