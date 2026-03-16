import type { DashboardAggregate } from "@/types/expense";

type CategoryBreakdownProps = {
  aggregate: DashboardAggregate;
};

export function CategoryBreakdown({ aggregate }: CategoryBreakdownProps) {
  if (aggregate.categoryBreakdown.length === 0) {
    return <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">Không có chi tiêu trong kỳ đã chọn.</div>;
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Phân bổ chi tiêu theo danh mục</h2>
      <ul className="mt-4 space-y-3">
        {aggregate.categoryBreakdown.map((item) => (
          <li key={item.categoryId} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-zinc-700">
              <span>{item.categoryName}</span>
              <span>{item.amount.toLocaleString("vi-VN")}</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-100">
              <div className="h-2 rounded-full bg-sky-600" style={{ width: `${Math.max(item.ratio * 100, 4)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
