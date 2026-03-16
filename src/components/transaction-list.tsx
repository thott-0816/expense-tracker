import type { TransactionRecord } from "@/types/expense";

import { TransactionEmptyState } from "@/components/transaction-empty-state";

type TransactionListProps = {
  items: TransactionRecord[];
  onDelete: (id: string) => Promise<void> | void;
};

export function TransactionList({ items, onDelete }: TransactionListProps) {
  if (items.length === 0) {
    return <TransactionEmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
        <thead className="bg-zinc-50">
          <tr>
            <th className="px-4 py-3 font-medium text-zinc-600">Ngày</th>
            <th className="px-4 py-3 font-medium text-zinc-600">Loại</th>
            <th className="px-4 py-3 font-medium text-zinc-600">Danh mục</th>
            <th className="px-4 py-3 font-medium text-zinc-600">Số tiền</th>
            <th className="px-4 py-3 font-medium text-zinc-600">Ghi chú</th>
            <th className="px-4 py-3 font-medium text-zinc-600">Tác vụ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{item.occurredAt}</td>
              <td className="px-4 py-3">{item.kind === "income" ? "Thu" : "Chi"}</td>
              <td className="px-4 py-3">{item.categoryName ?? item.categoryId}</td>
              <td className="px-4 py-3">{item.amount.toLocaleString("vi-VN")}</td>
              <td className="px-4 py-3">{item.note ?? "-"}</td>
              <td className="px-4 py-3">
                <button className="text-sm font-medium text-red-600" onClick={() => onDelete(item.id)} type="button">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
