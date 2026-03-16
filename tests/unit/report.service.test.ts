import { describe, expect, it } from "vitest";

import { calculateMonthlyReport } from "@/features/reports/report.service";

describe("report service", () => {
  it("calculates summary and bar chart values for selected month", () => {
    const result = calculateMonthlyReport(
      {
        month: "2026-03",
      },
      {
        filteredItems: [
          { kind: "income", amount: 25000000 },
          { kind: "expense", amount: 2500000 },
          { kind: "expense", amount: 1500000 },
        ],
        monthlyExpenseItems: [
          { categoryId: "cat_food", categoryName: "Ăn uống", amount: 2500000 },
          { categoryId: "cat_transport", categoryName: "Di chuyển", amount: 1500000 },
        ],
      },
    );

    expect(result.summary.totalIncome).toBe(25000000);
    expect(result.summary.totalExpense).toBe(4000000);
    expect(result.summary.balance).toBe(21000000);
    expect(result.barChart.incomeAmount).toBe(25000000);
    expect(result.barChart.expenseAmount).toBe(4000000);
    expect(result.pieChart.items).toHaveLength(2);
  });

  it("applies category filter to summary and bar but not to pie chart", () => {
    const result = calculateMonthlyReport(
      {
        month: "2026-03",
        categoryId: "cat_food",
      },
      {
        filteredItems: [{ kind: "expense", amount: 2500000 }],
        monthlyExpenseItems: [
          { categoryId: "cat_food", categoryName: "Ăn uống", amount: 2500000 },
          { categoryId: "cat_transport", categoryName: "Di chuyển", amount: 1800000 },
        ],
      },
    );

    expect(result.summary.totalExpense).toBe(2500000);
    expect(result.barChart.expenseAmount).toBe(2500000);
    expect(result.pieChart.items).toHaveLength(2);
    expect(result.pieChart.items[0]?.amount).toBe(2500000);
    expect(result.pieChart.items[0]?.categoryId).toBe("cat_food");
    expect(result.pieChart.items[1]?.categoryId).toBe("cat_transport");
  });

  it("keeps both bars with zero when month has no data", () => {
    const result = calculateMonthlyReport(
      {
        month: "2026-04",
      },
      {
        filteredItems: [],
        monthlyExpenseItems: [],
      },
    );

    expect(result.barChart.incomeAmount).toBe(0);
    expect(result.barChart.expenseAmount).toBe(0);
    expect(result.pieChart.items).toEqual([]);
  });

  it("keeps expense bar at zero when month has only income", () => {
    const result = calculateMonthlyReport(
      { month: "2026-05" },
      {
        filteredItems: [{ kind: "income", amount: 12000000 }],
        monthlyExpenseItems: [],
      },
    );

    expect(result.barChart.incomeAmount).toBe(12000000);
    expect(result.barChart.expenseAmount).toBe(0);
  });

  it("keeps income bar at zero when month has only expense", () => {
    const result = calculateMonthlyReport(
      { month: "2026-05" },
      {
        filteredItems: [{ kind: "expense", amount: 3200000 }],
        monthlyExpenseItems: [{ categoryId: "cat_food", categoryName: "Ăn uống", amount: 3200000 }],
      },
    );

    expect(result.barChart.incomeAmount).toBe(0);
    expect(result.barChart.expenseAmount).toBe(3200000);
  });
});
