import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DashboardPeriodSwitcher } from "@/components/dashboard-period-switcher";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionForm } from "@/components/transaction-form";

describe("accessibility smoke coverage", () => {
  it("announces validation errors and returns focus to the invalid amount field", async () => {
    const onSubmit = vi.fn();

    render(
      <TransactionForm
        categories={[{ id: "cat_1", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
        onSubmit={onSubmit}
      />,
    );

    const amountInput = screen.getByRole("textbox", { name: /số tiền/i });
    fireEvent.change(amountInput, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: /lưu giao dịch/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/số tiền phải lớn hơn 0/i);
    expect(amountInput).toHaveAttribute("aria-invalid", "true");
    expect(amountInput).toHaveFocus();
  });

  it("renders keyboard-friendly search and period controls", () => {
    render(
      <>
        <DashboardPeriodSwitcher period="week" onChange={vi.fn()} />
        <TransactionFilters
          categories={[{ id: "cat_1", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
          filters={{ keyword: "lunch", kind: "expense", categoryId: "cat_1", fromDate: "2026-03-01", toDate: "2026-03-31" }}
          onChange={vi.fn()}
        />
      </>,
    );

    expect(screen.getByRole("tablist", { name: /chọn kỳ báo cáo/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /tuần/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("search", { name: /bộ lọc giao dịch/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /xóa bộ lọc/i })).toBeInTheDocument();
  });
});
