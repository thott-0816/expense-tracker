"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { CategoryExpenseDistribution } from "@/types/expense";

type ReportCategoryPieProps = {
  distribution: CategoryExpenseDistribution;
};

const palette = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#14b8a6"];

export function ReportCategoryPie({ distribution }: ReportCategoryPieProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Cơ cấu chi tiêu theo danh mục</h2>

      {distribution.items.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">Không có dữ liệu chi tiêu cho tháng này.</p>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution.items}
                  dataKey="amount"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={110}
                  paddingAngle={2}
                >
                  {distribution.items.map((slice, index) => (
                    <Cell key={slice.categoryId} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => Number(value).toLocaleString("vi-VN")} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-2" aria-label="Chú thích cơ cấu chi tiêu">
            {distribution.items.map((slice, index) => (
              <li key={slice.categoryId} className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2">
                <span className="inline-flex min-w-0 flex-1 items-start gap-2 text-sm text-zinc-700">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                  <span className="break-words leading-5">{slice.categoryName}</span>
                </span>
                <span className="shrink-0 text-sm font-medium text-zinc-900">{(slice.ratio * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
