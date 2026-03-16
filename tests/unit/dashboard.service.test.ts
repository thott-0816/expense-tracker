import { describe, expect, it } from "vitest";

import { calculateDashboardAggregate } from "@/features/dashboard/dashboard.service";

describe("dashboard service", () => {
  it("calculates income, expense, balance, and category ratios", () => {
    const result = calculateDashboardAggregate("month", [
      { kind: "income", amount: 25000000, categoryId: "cat_salary", categoryName: "Salary" },
      { kind: "expense", amount: 2500000, categoryId: "cat_food", categoryName: "Food" },
      { kind: "expense", amount: 1500000, categoryId: "cat_transport", categoryName: "Transport" },
    ]);

    expect(result.totalIncome).toBe(25000000);
    expect(result.totalExpense).toBe(4000000);
    expect(result.balance).toBe(21000000);
    expect(result.categoryBreakdown).toHaveLength(2);
    expect(result.categoryBreakdown[0]?.ratio).toBeGreaterThan(0.6);
  });
});
