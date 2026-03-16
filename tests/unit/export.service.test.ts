import { describe, expect, it, vi } from "vitest";

import { exportService } from "@/features/export/export.service";

vi.mock("@/features/transactions/transaction-search.service", () => ({
  listAllFilteredTransactions: vi.fn().mockResolvedValue([
    {
      id: "txn_1",
      kind: "expense",
      amount: 120000,
      occurredAt: "2026-03-14",
      categoryId: "cat_food",
      categoryName: "Food",
      note: "Lunch",
      createdAt: "2026-03-14T00:00:00.000Z",
      updatedAt: "2026-03-14T00:00:00.000Z",
    },
    {
      id: "txn_2",
      kind: "expense",
      amount: 50000,
      occurredAt: "2026-03-15",
      categoryId: "cat_transport",
      categoryName: "Transport",
      note: "Taxi",
      createdAt: "2026-03-15T00:00:00.000Z",
      updatedAt: "2026-03-15T00:00:00.000Z",
    },
  ]),
}));

describe("export service", () => {
  it("exports all filtered transactions without pagination", async () => {
    const filter = { kind: "expense" as const, keyword: "lunch" };
    const result = await exportService.exportTransactions(filter);

    expect(result.filename).toMatch(/^transactions-\d{8}\.csv$/);

    const lines = result.content.trim().split("\n");
    expect(lines).toHaveLength(3);
    expect(lines[1]).toContain("txn_1");
    expect(lines[2]).toContain("txn_2");
  });
});
