"use client";

import { useCallback, useEffect, useState } from "react";

import type { CategoryRecord, TransactionRecord } from "@/types/expense";

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
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createTransaction: (payload: CreateTransactionPayload) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}

export function useTransactions(queryString = ""): TransactionsState {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesResponse, transactionsResponse] = await Promise.all([
        fetch("/api/categories", { cache: "no-store" }),
        fetch(queryString ? `/api/transactions?${queryString}` : "/api/transactions", { cache: "no-store" }),
      ]);

      const [categoriesBody, transactionsBody] = await Promise.all([
        readJson<{ items: CategoryRecord[] }>(categoriesResponse),
        readJson<{ items: TransactionRecord[] }>(transactionsResponse),
      ]);

      setCategories(categoriesBody.items);
      setTransactions(transactionsBody.items);
      setError(null);
    } catch {
      setError("Không thể tải dữ liệu thu chi lúc này");
    } finally {
      setLoading(false);
    }
  }, [queryString]);

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

  return { categories, transactions, loading, error, refresh, createTransaction, deleteTransaction };
}
