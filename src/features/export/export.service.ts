import { exportTransactionsCsv } from "@/lib/csv/export-transactions";

import type { FilterQuery } from "@/types/expense";

import { listAllFilteredTransactions } from "@/features/transactions/transaction-search.service";

function buildFilename(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `transactions-${yyyy}${mm}${dd}.csv`;
}

export const exportService = {
  async exportTransactions(filter: FilterQuery = {}) {
    const items = await listAllFilteredTransactions(filter);
    return {
      filename: buildFilename(new Date()),
      content: exportTransactionsCsv(items),
    };
  },
};
