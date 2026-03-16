"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { ErrorBanner } from "@/components/error-banner";
import { ExportCsvButton } from "@/components/export-csv-button";
import { TransactionPagination } from "@/components/transaction-pagination";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { useTransactionFilters } from "@/features/transactions/use-transaction-filters";
import { useTransactions } from "@/features/transactions/use-transactions";

export default function Home() {
  const { filters, setFilters, queryString } = useTransactionFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    categories,
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    total,
    totalPages,
    page,
  } = useTransactions(queryString, currentPage, pageSize);
  const [editingTransaction, setEditingTransaction] = useState<(typeof transactions)[number] | null>(null);

  function handleFilterChange(next: typeof filters) {
    setCurrentPage(1);
    setFilters(next);
  }

  async function handleTransactionSubmit(payload: {
    kind: "income" | "expense";
    amount: number;
    occurredAt: string;
    categoryId: string;
    note?: string;
  }) {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, payload);
      setEditingTransaction(null);
      return;
    }

    await createTransaction(payload);
  }

  return (
    <AppShell
      accent="sky"
      compact
      currentView="transactions"
      badge="Expense Tracker"
    >
      {error ? <ErrorBanner message={error} /> : null}
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <TransactionForm
            key={editingTransaction?.id ?? "new"}
            categories={categories}
            initialTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
            onSubmit={handleTransactionSubmit}
          />
          <section className="space-y-4">
            <div className="flex flex-col gap-4">
              <TransactionFilters categories={categories} filters={filters} onChange={handleFilterChange} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <TransactionPagination
                currentPage={page}
                pageSize={pageSize}
                totalItems={total}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onPageSizeChange={(nextPageSize) => {
                  setPageSize(nextPageSize);
                  setCurrentPage(1);
                }}
              />
              <ExportCsvButton href={queryString ? `/api/transactions/export.csv?${queryString}` : "/api/transactions/export.csv"} />
            </div>
            <TransactionList
              items={transactions}
              loading={loading}
              onDelete={deleteTransaction}
              onEdit={setEditingTransaction}
            />
          </section>
        </div>
    </AppShell>
  );
}
