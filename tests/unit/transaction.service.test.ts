import { describe, expect, it, vi } from "vitest";

import { createTransactionService } from "@/features/transactions/transaction.service";

describe("transaction service", () => {
  it("rejects transaction creation when category does not exist", async () => {
    const repository = {
      listTransactions: vi.fn(),
      listAllTransactions: vi.fn(),
      createTransaction: vi.fn(),
      updateTransaction: vi.fn(),
      deleteTransaction: vi.fn(),
      getTransactionById: vi.fn(),
    };
    const categoryRepository = {
      getCategoryById: vi.fn().mockResolvedValue(null),
    };

    const service = createTransactionService(repository, categoryRepository);

    await expect(
      service.createTransaction({
        kind: "expense",
        amount: 120000,
        occurredAt: "2026-03-14",
        categoryId: "missing",
        note: "Lunch",
      }),
    ).rejects.toThrowError("Danh mục không tồn tại");
  });

  it("preserves createdAt and refreshes updatedAt on update", async () => {
    const createdAt = "2026-03-14T00:00:00.000Z";
    const repository = {
      listTransactions: vi.fn(),
      listAllTransactions: vi.fn(),
      createTransaction: vi.fn(),
      updateTransaction: vi.fn().mockResolvedValue({
        id: "txn_1",
        kind: "expense",
        amount: 150000,
        occurredAt: "2026-03-14",
        categoryId: "cat_1",
        note: "Lunch",
        createdAt,
        updatedAt: "2026-03-15T00:00:00.000Z",
      }),
      deleteTransaction: vi.fn(),
      getTransactionById: vi.fn().mockResolvedValue({
        id: "txn_1",
        kind: "expense",
        amount: 120000,
        occurredAt: "2026-03-14",
        categoryId: "cat_1",
        note: "Lunch",
        createdAt,
        updatedAt: createdAt,
      }),
    };
    const categoryRepository = {
      getCategoryById: vi.fn().mockResolvedValue({ id: "cat_1" }),
    };

    const service = createTransactionService(repository, categoryRepository);
    const result = await service.updateTransaction("txn_1", { amount: 150000 });

    expect(result.createdAt).toBe(createdAt);
    expect(result.updatedAt).not.toBe(createdAt);
  });
});
