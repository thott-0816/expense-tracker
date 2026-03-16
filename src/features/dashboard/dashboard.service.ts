import { toDashboardAggregate } from "@/lib/db/mappers";

import type { DashboardAggregate, DashboardPeriod } from "@/types/expense";

import { listDashboardSourceData } from "@/features/dashboard/dashboard.repository";

type DashboardSourceItem = {
  kind: "income" | "expense";
  amount: number;
  categoryId: string;
  categoryName: string;
};

export function calculateDashboardAggregate(period: DashboardPeriod, items: DashboardSourceItem[]): DashboardAggregate {
  const totalIncome = items
    .filter((item) => item.kind === "income")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = items
    .filter((item) => item.kind === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenseItems = items.filter((item) => item.kind === "expense");
  const grouped = new Map<string, { categoryId: string; categoryName: string; amount: number }>();

  for (const item of expenseItems) {
    const current = grouped.get(item.categoryId);
    grouped.set(item.categoryId, {
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      amount: (current?.amount ?? 0) + item.amount,
    });
  }

  const categoryBreakdown = [...grouped.values()]
    .sort((left, right) => right.amount - left.amount)
    .map((item) => ({
      ...item,
      ratio: totalExpense === 0 ? 0 : Number((item.amount / totalExpense).toFixed(4)),
    }));

  return toDashboardAggregate(period, totalIncome, totalExpense, categoryBreakdown);
}

export const dashboardService = {
  async getDashboardAggregate(input: { period: DashboardPeriod; fromDate?: string; toDate?: string }) {
    const items = await listDashboardSourceData(input);
    return calculateDashboardAggregate(input.period, items);
  },
};
