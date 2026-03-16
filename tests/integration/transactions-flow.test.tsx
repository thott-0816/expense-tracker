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
});
