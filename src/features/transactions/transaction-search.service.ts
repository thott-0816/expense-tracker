import type { FilterQuery } from "@/types/expense";

import { transactionService } from "@/features/transactions/transaction.service";

export async function listFilteredTransactions(filter: FilterQuery = {}) {
  return transactionService.listTransactions(filter);
}
