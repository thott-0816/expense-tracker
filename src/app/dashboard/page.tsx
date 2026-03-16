"use client";

import { AppShell } from "@/components/app-shell";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { DashboardSummary } from "@/components/dashboard-summary";
import { ErrorBanner } from "@/components/error-banner";
import { useDashboard } from "@/features/dashboard/use-dashboard";

export default function DashboardPage() {
  const { data, loading, error } = useDashboard();

  return (
    <AppShell
      accent="sky"
      compact
      currentView="dashboard"
      badge="Expense Tracker"
    >
      {error ? <ErrorBanner message={error} /> : null}
      {loading || !data ? <DashboardSkeleton /> : <DashboardSummary aggregate={data} />}
      {data ? <CategoryBreakdown aggregate={data} /> : null}
    </AppShell>
  );
}
