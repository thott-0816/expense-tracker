import { ApiError } from "@/lib/api/errors";
import { logEvent } from "@/lib/logger";

import type { FilterQuery } from "@/types/expense";
import type { CreateTransactionInput, UpdateTransactionInput } from "@/lib/validation/transaction";

import { categoryRepository } from "@/features/categories/category.repository";
import { transactionRepository } from "@/features/transactions/transaction.repository";

type TransactionRepository = typeof transactionRepository;
type CategoryRepository = Pick<typeof categoryRepository, "getCategoryById">;

async function ensureCategoryExists(repository: CategoryRepository, categoryId?: string) {
  if (!categoryId) {
    return;
  }

  const category = await repository.getCategoryById(categoryId);
  if (!category) {
    throw new ApiError("NOT_FOUND", "Danh mục không tồn tại", 404, [
      { field: "categoryId", message: "Danh mục không tồn tại" },
    ]);
  }
}

export function createTransactionService(repository: TransactionRepository, categories: CategoryRepository) {
  return {
    listTransactions(filter: FilterQuery = {}) {
      return repository.listTransactions(filter);
    },

    async createTransaction(input: CreateTransactionInput) {
      await ensureCategoryExists(categories, input.categoryId);
      const result = await repository.createTransaction({
        ...input,
        note: input.note?.trim() ? input.note.trim() : null,
      });
      logEvent("info", "transaction.created", { id: result.id });
      return result;
    },

    async updateTransaction(id: string, input: UpdateTransactionInput) {
      const existing = await repository.getTransactionById(id);
      if (!existing) {
        throw new ApiError("NOT_FOUND", "Giao dịch không tồn tại", 404);
      }

      await ensureCategoryExists(categories, input.categoryId);
      const result = await repository.updateTransaction(id, {
        ...input,
        note: input.note?.trim() ? input.note.trim() : input.note === "" ? null : input.note,
      });
      logEvent("info", "transaction.updated", { id: result.id });
      return result;
    },

    async deleteTransaction(id: string) {
      const existing = await repository.getTransactionById(id);
      if (!existing) {
        throw new ApiError("NOT_FOUND", "Giao dịch không tồn tại", 404);
      }

      await repository.deleteTransaction(id);
      logEvent("info", "transaction.deleted", { id });
    },
  };
}

export const transactionService = createTransactionService(transactionRepository, categoryRepository);
