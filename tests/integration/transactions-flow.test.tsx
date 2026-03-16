import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TransactionForm } from "@/components/transaction-form";

describe("transaction form integration", () => {
  it("shows a validation error when amount is invalid", async () => {
    const onSubmit = vi.fn();

    render(
      <TransactionForm
        categories={[{ id: "cat_1", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText(/số tiền/i), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /lưu giao dịch/i }));

    expect(await screen.findByText(/số tiền phải lớn hơn 0/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows edit mode labels and allows cancelling edit", () => {
    const onSubmit = vi.fn();
    const onCancelEdit = vi.fn();

    render(
      <TransactionForm
        categories={[{ id: "cat_1", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
        initialTransaction={{
          id: "txn_1",
          kind: "expense",
          amount: 120000,
          occurredAt: "2026-03-14",
          categoryId: "cat_1",
          categoryName: "Food",
          note: "Lunch",
          createdAt: "2026-03-14T00:00:00.000Z",
          updatedAt: "2026-03-14T00:00:00.000Z",
        }}
        onCancelEdit={onCancelEdit}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByRole("heading", { name: /chỉnh sửa giao dịch/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("120000")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /hủy chỉnh sửa/i }));

    expect(onCancelEdit).toHaveBeenCalledTimes(1);
  });
});
