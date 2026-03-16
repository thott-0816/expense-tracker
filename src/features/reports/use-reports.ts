"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { CategoryRecord, MonthlyReportResponse } from "@/types/expense";

type ReportFilterState = {
  month: string;
  categoryId: string;
};

type ReportsState = {
  categories: CategoryRecord[];
  data: MonthlyReportResponse | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  filters: ReportFilterState;
  setFilters: (next: ReportFilterState) => void;
  resetCategoryFilter: () => void;
  refresh: () => Promise<void>;
};

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json() as Promise<T>;
}

export function useReports(): ReportsState {
  const [filters, setFilters] = useState<ReportFilterState>({ month: getCurrentMonth(), categoryId: "" });
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [data, setData] = useState<MonthlyReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ month: filters.month });
    if (filters.categoryId) {
      params.set("categoryId", filters.categoryId);
    }
    return params.toString();
  }, [filters]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing((prev) => prev || !loading);
      const [categoriesResponse, reportResponse] = await Promise.all([
        fetch("/api/categories", { cache: "no-store" }),
        fetch(`/api/reports/monthly?${queryString}`, { cache: "no-store" }),
      ]);

      const [categoriesBody, reportBody] = await Promise.all([
        readJson<{ items: CategoryRecord[] }>(categoriesResponse),
        readJson<MonthlyReportResponse>(reportResponse),
      ]);

      setCategories(categoriesBody.items);
      setData(reportBody);
      setError(null);
    } catch {
      setError("Không thể tải dữ liệu báo cáo lúc này");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading, queryString]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    function handleWindowFocus() {
      void refresh();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    }

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refresh]);

  return {
    categories,
    data,
    loading,
    refreshing,
    error,
    filters,
    setFilters,
    resetCategoryFilter: () => setFilters((prev) => ({ ...prev, categoryId: "" })),
    refresh,
  };
}
