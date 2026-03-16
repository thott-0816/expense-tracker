import type { FilterQuery, PaginationQuery } from "@/types/expense";

import { transactionService } from "@/features/transactions/transaction.service";

export async function listFilteredTransactions(filter: FilterQuery = {}, pagination: PaginationQuery = {}) {
  return transactionService.listTransactions(filter, pagination);
}

export async function listAllFilteredTransactions(filter: FilterQuery = {}) {
  return transactionService.listAllTransactions(filter);
}
