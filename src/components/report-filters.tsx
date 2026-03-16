"use client";

import type { CategoryRecord } from "@/types/expense";

type ReportFilterState = {
  month: string;
  categoryId: string;
};

type ReportFiltersProps = {
  categories: CategoryRecord[];
  filters: ReportFilterState;
  onChange: (next: ReportFilterState) => void;
  onResetCategory: () => void;
};

export function ReportFilters({ categories, filters, onChange, onResetCategory }: ReportFiltersProps) {
  const hasActiveCategoryFilter = Boolean(filters.categoryId);

  return (
    <form
      aria-label="Bộ lọc báo cáo"
      className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)] md:grid-cols-[repeat(2,minmax(0,1fr))_auto]"
      role="search"
    >
      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Tháng báo cáo
        <input
          aria-label="Tháng báo cáo"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          type="month"
          value={filters.month}
          onChange={(event) => onChange({ ...filters, month: event.target.value })}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Danh mục lọc
        <select
          aria-label="Danh mục lọc báo cáo"
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

      <div className="flex items-end justify-end">
        <button
          aria-label="Đặt lại bộ lọc"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!hasActiveCategoryFilter}
          onClick={onResetCategory}
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
