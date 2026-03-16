import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TransactionFilters } from "@/components/transaction-filters";

describe("transaction filters", () => {
  it("submits keyword and category changes", () => {
    const onChange = vi.fn();

    render(
      <TransactionFilters
        categories={[{ id: "cat_food", name: "Food", type: "expense", description: null, createdAt: "", updatedAt: "" }]}
        filters={{ keyword: "", kind: "all", categoryId: "", fromDate: "", toDate: "" }}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(/tìm kiếm/i), { target: { value: "lunch" } });
    fireEvent.change(screen.getByLabelText(/danh mục lọc/i), { target: { value: "cat_food" } });

    expect(onChange).toHaveBeenCalled();
  });
});
