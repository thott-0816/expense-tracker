import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/transactions/transaction-search.service", () => ({
  listFilteredTransactions: vi.fn().mockResolvedValue({
    items: [
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
    ],
    total: 1,
  }),
}));

vi.mock("@/features/export/export.service", () => ({
  exportService: {
    exportTransactions: vi.fn().mockResolvedValue({
      filename: "transactions-20260314.csv",
      content: "id,occurredAt\n",
    }),
  },
}));

import { GET as GET_TRANSACTIONS } from "@/app/api/transactions/route";
import { GET as GET_EXPORT } from "@/app/api/transactions/export.csv/route";

describe("filtered transactions and export contract", () => {
  it("returns filtered transactions", async () => {
    const response = await GET_TRANSACTIONS(new Request("http://localhost/api/transactions?keyword=lunch"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.total).toBe(1);
  });

  it("returns csv export headers", async () => {
    const response = await GET_EXPORT(new Request("http://localhost/api/transactions/export.csv?keyword=lunch"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("content-disposition")).toContain("transactions-20260314.csv");
  });
});
