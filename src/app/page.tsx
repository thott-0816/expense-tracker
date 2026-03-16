"use client";

import { AppShell } from "@/components/app-shell";
import { ErrorBanner } from "@/components/error-banner";
import { ExportCsvButton } from "@/components/export-csv-button";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { useTransactionFilters } from "@/features/transactions/use-transaction-filters";
import { useTransactions } from "@/features/transactions/use-transactions";

export default function Home() {
  const { filters, setFilters, queryString } = useTransactionFilters();
  const { categories, transactions, loading, error, createTransaction, deleteTransaction } =
    useTransactions(queryString);

  return (
    <AppShell
      accent="sky"
      actions={
        <ExportCsvButton href={queryString ? `/api/transactions/export.csv?${queryString}` : "/api/transactions/export.csv"} />
      }
      badge="Expense Tracker"
      description="Tạo, sửa, và xóa giao dịch thu chi. Dashboard tổng hợp được tách riêng tại /dashboard."
      title="Quản lý giao dịch"
    >
      {error ? <ErrorBanner message={error} /> : null}
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <TransactionForm categories={categories} onSubmit={createTransaction} />
          <section className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold">Danh sách giao dịch</h2>
                <p className="text-sm text-zinc-500">Sắp xếp theo ngày phát sinh giảm dần.</p>
              </div>
              {loading ? <span className="text-sm text-zinc-500">Đang tải...</span> : null}
            </div>
            <div className="flex flex-col gap-4">
              <TransactionFilters categories={categories} filters={filters} onChange={setFilters} />
            </div>
            <TransactionList items={transactions} onDelete={deleteTransaction} />
          </section>
        </div>
    </AppShell>
  );
}
