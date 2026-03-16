"use client";

import { AppShell } from "@/components/app-shell";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { DashboardPeriodSwitcher } from "@/components/dashboard-period-switcher";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { DashboardSummary } from "@/components/dashboard-summary";
import { ErrorBanner } from "@/components/error-banner";
import { useDashboard } from "@/features/dashboard/use-dashboard";

export default function DashboardPage() {
  const { period, setPeriod, data, loading, error } = useDashboard();

  return (
    <AppShell
      accent="sky"
      compact
      currentView="dashboard"
      actions={<DashboardPeriodSwitcher period={period} onChange={setPeriod} />}
      badge="Expense Tracker"
      description="Theo dõi tổng thu, tổng chi, số dư và phân bổ chi tiêu theo từng khoảng thời gian."
      title="Dashboard thu chi"
    >
      {error ? <ErrorBanner message={error} /> : null}
      {loading || !data ? <DashboardSkeleton /> : <DashboardSummary aggregate={data} />}
      {data ? <CategoryBreakdown aggregate={data} /> : null}
    </AppShell>
  );
}
