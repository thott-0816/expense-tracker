"use client";

import type { CategoryRecord } from "@/types/expense";

import type { TransactionFilterState } from "@/features/transactions/use-transaction-filters";

type TransactionFiltersProps = {
  categories: CategoryRecord[];
  filters: TransactionFilterState;
  onChange: (next: TransactionFilterState) => void;
};

export function TransactionFilters({ categories, filters, onChange }: TransactionFiltersProps) {
  const hasActiveFilters =
    Boolean(filters.keyword) ||
    filters.kind !== "all" ||
    Boolean(filters.categoryId) ||
    Boolean(filters.fromDate) ||
    Boolean(filters.toDate);

  return (
    <form
      aria-label="Bộ lọc giao dịch"
      className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)] md:grid-cols-[repeat(5,minmax(0,1fr))_auto]"
      role="search"
    >
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Tìm kiếm
        <input
          aria-label="Tìm kiếm"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={filters.keyword}
          onChange={(event) => onChange({ ...filters, keyword: event.target.value })}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Loại lọc
        <select
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={filters.kind}
          onChange={(event) => onChange({ ...filters, kind: event.target.value as TransactionFilterState["kind"] })}
        >
          <option value="all">Tất cả</option>
          <option value="income">Thu</option>
          <option value="expense">Chi</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Danh mục lọc
        <select
          aria-label="Danh mục lọc"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={filters.categoryId}
          onChange={(event) => onChange({ ...filters, categoryId: event.target.value })}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Từ ngày
        <input
          type="date"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={filters.fromDate}
          onChange={(event) => onChange({ ...filters, fromDate: event.target.value })}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Đến ngày
        <input
          type="date"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={filters.toDate}
          onChange={(event) => onChange({ ...filters, toDate: event.target.value })}
        />
      </label>
      <div className="flex items-end justify-end">
        <button
          aria-label="Đặt lại bộ lọc"
          title="Đặt lại bộ lọc"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!hasActiveFilters}
          onClick={() => onChange({ keyword: "", kind: "all", categoryId: "", fromDate: "", toDate: "" })}
          type="button"
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            <path d="M20 4v4h-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </button>
      </div>
    </form>
  );
}
