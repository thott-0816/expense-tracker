"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { MonthlyIncomeExpenseSeries } from "@/types/expense";

type ReportIncomeExpenseBarProps = {
  series: MonthlyIncomeExpenseSeries;
};

function formatCurrencyTick(value: number) {
  return value.toLocaleString("vi-VN");
}

export function ReportIncomeExpenseBar({ series }: ReportIncomeExpenseBarProps) {
  const data = [
    { label: "Thu", amount: series.incomeAmount, fill: "#16a34a" },
    { label: "Chi", amount: series.expenseAmount, fill: "#fca5a5" },
  ];
  const maxAmount = Math.max(...data.map((item) => item.amount), 0);
  const yAxisWidth = Math.max(formatCurrencyTick(maxAmount).length * 10, 88);

  return (
    <section aria-label="Biểu đồ cột thu chi" className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Biểu đồ cột thu chi</h2>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis tickFormatter={formatCurrencyTick} tickMargin={8} width={yAxisWidth} />
            <Tooltip formatter={(value) => formatCurrencyTick(Number(value))} />
            <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
              {data.map((item) => (
                <Cell key={item.label} fill={item.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
