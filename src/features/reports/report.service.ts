import { ApiError } from "@/lib/api/errors";
import { logEvent } from "@/lib/logger";

import type { MonthlyReportResponse } from "@/types/expense";

import { reportRepository } from "@/features/reports/report.repository";

type ReportFilterInput = {
  month: string;
  categoryId?: string;
};

type ReportSourceData = {
  filteredItems: Array<{ kind: "income" | "expense"; amount: number }>;
  monthlyExpenseItems: Array<{ categoryId: string; categoryName: string; amount: number }>;
};

export function calculateMonthlyReport(filter: ReportFilterInput, source: ReportSourceData): MonthlyReportResponse {
  const totalIncome = source.filteredItems
    .filter((item) => item.kind === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = source.filteredItems
    .filter((item) => item.kind === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const grouped = new Map<string, { categoryId: string; categoryName: string; amount: number }>();

  for (const item of source.monthlyExpenseItems) {
    const current = grouped.get(item.categoryId);
    grouped.set(item.categoryId, {
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      amount: (current?.amount ?? 0) + item.amount,
    });
  }

  const pieTotalExpense = [...grouped.values()].reduce((sum, item) => sum + item.amount, 0);
  const pieItems = [...grouped.values()]
    .sort((left, right) => right.amount - left.amount)
    .map((item) => ({
      ...item,
      ratio: pieTotalExpense === 0 ? 0 : Number((item.amount / pieTotalExpense).toFixed(4)),
    }));

  return {
    filter: {
      month: filter.month,
      categoryId: filter.categoryId,
    },
    summary: {
      month: filter.month,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      filterCategoryId: filter.categoryId ?? null,
    },
    barChart: {
      month: filter.month,
      incomeAmount: totalIncome,
      expenseAmount: totalExpense,
      incomeColor: "green",
      expenseColor: "light-red",
    },
    pieChart: {
      month: filter.month,
      items: pieItems,
    },
    generatedAt: new Date().toISOString(),
  };
}

export const reportService = {
  async getMonthlyReport(filter: ReportFilterInput): Promise<MonthlyReportResponse> {
    if (filter.categoryId) {
      const exists = await reportRepository.categoryExists(filter.categoryId);
      if (!exists) {
        throw new ApiError("NOT_FOUND", "Danh mục không tồn tại", 404, [
          { field: "categoryId", message: "Danh mục không tồn tại" },
        ]);
      }
    }

    try {
      const source = await reportRepository.getMonthlyReportSource(filter);
      return calculateMonthlyReport(filter, source);
    } catch (error) {
      logEvent("error", "report.aggregate.failed", {
        month: filter.month,
        categoryId: filter.categoryId ?? null,
      });
      throw error;
    }
  },
};
