"use client";

import { AppShell } from "@/components/app-shell";
import { ErrorBanner } from "@/components/error-banner";
import { ReportCategoryPie } from "@/components/report-category-pie";
import { ReportFilters } from "@/components/report-filters";
import { ReportIncomeExpenseBar } from "@/components/report-income-expense-bar";
import { ReportSummary } from "@/components/report-summary";
import { useReports } from "@/features/reports/use-reports";

export default function ReportsPage() {
  const { categories, data, loading, refreshing, error, filters, setFilters, resetCategoryFilter } = useReports();
  const isEmpty = Boolean(
    data &&
      data.summary.totalIncome === 0 &&
      data.summary.totalExpense === 0 &&
      data.pieChart.items.length === 0,
  );

  return (
    <AppShell accent="sky" compact currentView="reports" badge="Expense Tracker">
      <section className="space-y-4">
        <ReportFilters categories={categories} filters={filters} onChange={setFilters} onResetCategory={resetCategoryFilter} />

        {refreshing ? <p className="text-sm text-zinc-500">Đang làm mới dữ liệu...</p> : null}
        {error ? <ErrorBanner message={error} /> : null}

        {loading && !data ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">Đang tải dữ liệu báo cáo...</div>
        ) : null}

        {isEmpty ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">Không có dữ liệu phù hợp với bộ lọc hiện tại.</div>
        ) : null}

        {data ? (
          <>
            <ReportSummary summary={data.summary} />
            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
              <ReportIncomeExpenseBar series={data.barChart} />
              <ReportCategoryPie distribution={data.pieChart} />
            </div>
          </>
        ) : null}
      </section>
    </AppShell>
  );
}
