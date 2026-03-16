"use client";

import { useEffect, useState } from "react";

import type { DashboardAggregate } from "@/types/expense";

export function useDashboard() {
  const [data, setData] = useState<DashboardAggregate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const payload = (await response.json()) as DashboardAggregate;
        if (!ignore) {
          setData(payload);
          setError(null);
        }
      } catch {
        if (!ignore) {
          setError("Không thể tải dashboard lúc này");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error };
}
