"use client";

import { useId, useRef, useState } from "react";

import { CategorySelect } from "@/components/category-select";
import { createTransactionSchema } from "@/lib/validation/transaction";

import type { CategoryRecord } from "@/types/expense";

type TransactionFormProps = {
  categories: CategoryRecord[];
  onSubmit: (payload: {
    kind: "income" | "expense";
    amount: number;
    occurredAt: string;
    categoryId: string;
    note?: string;
  }) => Promise<void> | void;
};

type TransactionFormValues = {
  kind: "income" | "expense";
  amount: string;
  occurredAt: string;
  categoryId: string;
  note: string;
};

const initialValues: TransactionFormValues = {
  kind: "expense",
  amount: "",
  occurredAt: new Date().toISOString().slice(0, 10),
  categoryId: "",
  note: "",
};

export function TransactionForm({ categories, onSubmit }: TransactionFormProps) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const amountInputId = useId();
  const occurredAtInputId = useId();
  const categoryInputId = useId();
  const noteInputId = useId();
  const errorId = useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = createTransactionSchema.safeParse({
      ...values,
      amount: Number(values.amount),
    });

    if (!parsed.success) {
      setError("Số tiền phải lớn hơn 0");
      amountInputRef.current?.focus();
      return;
    }

    setError(null);
    await onSubmit(parsed.data);
    setValues(initialValues);
  }

  return (
    <form className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)]" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-zinc-950">Thêm giao dịch</h2>
        <p className="text-sm text-zinc-500">Ghi nhận dòng tiền thu và chi hằng ngày.</p>
      </div>
      <fieldset className="grid gap-4">
        <legend className="sr-only">Thông tin giao dịch</legend>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
          Loại giao dịch
          <select
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            value={values.kind}
            onChange={(event) => setValues((current) => ({ ...current, kind: event.target.value as "income" | "expense" }))}
          >
            <option value="expense">Chi</option>
            <option value="income">Thu</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700" htmlFor={amountInputId}>
          Số tiền
          <input
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? "true" : "false"}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            id={amountInputId}
            inputMode="numeric"
            ref={amountInputRef}
            value={values.amount}
            onChange={(event) => setValues((current) => ({ ...current, amount: event.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700" htmlFor={occurredAtInputId}>
          Ngày phát sinh
          <input
            type="date"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            id={occurredAtInputId}
            value={values.occurredAt}
            onChange={(event) => setValues((current) => ({ ...current, occurredAt: event.target.value }))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700" htmlFor={categoryInputId}>
          Danh mục
          <CategorySelect
            categories={categories}
            id={categoryInputId}
            value={values.categoryId}
            onChange={(categoryId) => setValues((current) => ({ ...current, categoryId }))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700" htmlFor={noteInputId}>
          Ghi chú
          <textarea
            className="min-h-24 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            id={noteInputId}
            value={values.note}
            onChange={(event) => setValues((current) => ({ ...current, note: event.target.value }))}
          />
        </label>
      </fieldset>
      {error ? (
        <p className="text-sm text-red-600" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
      <button className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" type="submit">
        Lưu giao dịch
      </button>
    </form>
  );
}
