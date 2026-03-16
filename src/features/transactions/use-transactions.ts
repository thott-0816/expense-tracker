"use client";

import { useCallback, useEffect, useState } from "react";

import type { CategoryRecord, PaginatedTransactions, TransactionRecord } from "@/types/expense";

type CreateTransactionPayload = {
  kind: "income" | "expense";
  amount: number;
  occurredAt: string;
  categoryId: string;
  note?: string;
};

type TransactionsState = {
  categories: CategoryRecord[];
  transactions: TransactionRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTransaction: (payload: CreateTransactionPayload) => Promise<void>;
  updateTransaction: (id: string, payload: CreateTransactionPayload) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}

export function useTransactions(queryString = "", page = 1, pageSize = 10): TransactionsState {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [resolvedPage, setResolvedPage] = useState(page);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(queryString);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      const [categoriesResponse, transactionsResponse] = await Promise.all([
        fetch("/api/categories", { cache: "no-store" }),
        fetch(`/api/transactions?${params.toString()}`, { cache: "no-store" }),
      ]);

      const [categoriesBody, transactionsBody] = await Promise.all([
        readJson<{ items: CategoryRecord[] }>(categoriesResponse),
        readJson<PaginatedTransactions>(transactionsResponse),
      ]);

      setCategories(categoriesBody.items);
      setTransactions(transactionsBody.items);
      setResolvedPage(transactionsBody.page);
      setTotal(transactionsBody.total);
      setTotalPages(transactionsBody.totalPages);
      setError(null);
    } catch {
      setError("Không thể tải dữ liệu thu chi lúc này");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, queryString]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function createTransaction(payload: CreateTransactionPayload) {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create transaction");
    }

    await refresh();
  }

  async function deleteTransaction(id: string) {
    const response = await fetch(`/api/transactions/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    await refresh();
  }

  async function updateTransaction(id: string, payload: CreateTransactionPayload) {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update transaction");
    }

    await refresh();
  }

  return {
    categories,
    transactions,
    page: resolvedPage,
    pageSize,
    total,
    totalPages,
    loading,
    error,
    refresh,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
