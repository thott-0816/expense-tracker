"use client";

import { useEffect, useMemo, useState } from "react";

export type TransactionFilterState = {
  keyword: string;
  kind: "income" | "expense" | "all";
  categoryId: string;
  fromDate: string;
  toDate: string;
};

const initialFilters: TransactionFilterState = {
  keyword: "",
  kind: "all",
  categoryId: "",
  fromDate: "",
  toDate: "",
};

export function useTransactionFilters() {
  const [filters, setFilters] = useState<TransactionFilterState>(() => {
    if (typeof window === "undefined") {
      return initialFilters;
    }

    const params = new URLSearchParams(window.location.search);
    return {
      keyword: params.get("keyword") ?? "",
      kind: (params.get("kind") as TransactionFilterState["kind"]) ?? "all",
      categoryId: params.get("categoryId") ?? "",
      fromDate: params.get("fromDate") ?? "",
      toDate: params.get("toDate") ?? "",
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.kind && filters.kind !== "all") params.set("kind", filters.kind);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.fromDate) params.set("fromDate", filters.fromDate);
    if (filters.toDate) params.set("toDate", filters.toDate);

    const next = params.toString();
    const url = next ? `/?${next}` : "/";
    window.history.replaceState({}, "", url);
  }, [filters]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.kind && filters.kind !== "all") params.set("kind", filters.kind);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.fromDate) params.set("fromDate", filters.fromDate);
    if (filters.toDate) params.set("toDate", filters.toDate);
    return params.toString();
  }, [filters]);

  return { filters, setFilters, queryString };
}
