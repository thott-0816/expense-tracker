import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TransactionForm } from "@/components/transaction-form";
import { exportTransactionsCsv } from "@/lib/csv/export-transactions";

vi.mock("@/features/transactions/use-transaction-filters", () => ({
  useTransactionFilters: () => ({
    filters: { keyword: "missing", kind: "all", categoryId: "", fromDate: "", toDate: "" },
    setFilters: vi.fn(),
    queryString: "keyword=missing",
  }),
}));

vi.mock("@/features/transactions/use-transactions", () => ({
  useTransactions: () => ({
    categories: [],
    transactions: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
    loading: false,
    error: null,
    refresh: vi.fn(),
    createTransaction: vi.fn(),
    updateTransaction: vi.fn(),
    deleteTransaction: vi.fn(),
  }),
}));

import Home from "@/app/page";

describe("transaction regressions", () => {
  it("keeps zero-amount transactions blocked", async () => {
    const onSubmit = vi.fn();

    render(
      <TransactionForm
        categories={[{ id: "cat_1", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByRole("textbox", { name: /số tiền/i }), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /lưu giao dịch/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/số tiền phải lớn hơn 0/i);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows the empty state and preserves export parity when keyword search misses", () => {
    render(<Home />);

    expect(screen.getByText(/chưa có giao dịch nào/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /xuất csv/i })).toHaveAttribute(
      "href",
      "/api/transactions/export.csv?keyword=missing",
    );
  });

  it("escapes CSV special characters including commas, quotes, and new lines", () => {
    const csv = exportTransactionsCsv([
      {
        id: "txn_special",
        occurredAt: "2026-03-14",
        kind: "expense",
        categoryName: "An uong",
        amount: 150000,
        note: 'Bua trua, "ngoai"\nTang 2',
        createdAt: "2026-03-14T00:00:00.000Z",
        updatedAt: "2026-03-14T00:00:00.000Z",
      },
    ]);

    expect(csv).toContain('"Bua trua, ""ngoai""\nTang 2"');
  });
});
