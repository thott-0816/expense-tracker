import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/transactions/transaction.service", () => ({
  transactionService: {
    listTransactions: vi.fn().mockResolvedValue({
      items: [
        {
          id: "txn_1",
          kind: "expense",
          amount: 120000,
          occurredAt: "2026-03-14",
          categoryId: "cat_1",
          categoryName: "Food",
          note: "Lunch",
          createdAt: "2026-03-14T00:00:00.000Z",
          updatedAt: "2026-03-14T00:00:00.000Z",
        },
      ],
      total: 1,
    }),
    createTransaction: vi.fn().mockResolvedValue({
      id: "txn_2",
      kind: "income",
      amount: 25000000,
      occurredAt: "2026-03-14",
      categoryId: "cat_2",
      categoryName: "Salary",
      note: "Luong",
      createdAt: "2026-03-14T00:00:00.000Z",
      updatedAt: "2026-03-14T00:00:00.000Z",
    }),
    updateTransaction: vi.fn().mockResolvedValue({ id: "txn_1" }),
    deleteTransaction: vi.fn().mockResolvedValue(undefined),
  },
}));

import { DELETE, PATCH } from "@/app/api/transactions/[id]/route";
import { GET, POST } from "@/app/api/transactions/route";

describe("/api/transactions contract", () => {
  it("returns filtered transaction collection", async () => {
    const response = await GET(new Request("http://localhost/api/transactions"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.total).toBe(1);
  });

  it("creates a transaction", async () => {
    const request = new Request("http://localhost/api/transactions", {
      method: "POST",
      body: JSON.stringify({
        kind: "income",
        amount: 25000000,
        occurredAt: "2026-03-14",
        categoryId: "cat_2",
        note: "Luong",
      }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.kind).toBe("income");
  });

  it("updates a transaction", async () => {
    const request = new Request("http://localhost/api/transactions/txn_1", {
      method: "PATCH",
      body: JSON.stringify({ amount: 150000 }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await PATCH(request, { params: Promise.resolve({ id: "txn_1" }) });

    expect(response.status).toBe(200);
  });

  it("deletes a transaction", async () => {
    const response = await DELETE(new Request("http://localhost/api/transactions/txn_1"), {
      params: Promise.resolve({ id: "txn_1" }),
    });

    expect(response.status).toBe(204);
  });
});
