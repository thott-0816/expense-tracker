import type { DashboardAggregate } from "@/types/expense";

type DashboardSummaryProps = {
  aggregate: DashboardAggregate;
};

export function DashboardSummary({ aggregate }: DashboardSummaryProps) {
  const cards = [
    { label: "Tổng thu", value: aggregate.totalIncome, tone: "text-emerald-600" },
    { label: "Tổng chi", value: aggregate.totalExpense, tone: "text-rose-600" },
    { label: "Số dư", value: aggregate.balance, tone: "text-sky-700" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">{card.label}</p>
          <p className={`mt-3 text-2xl font-semibold ${card.tone}`}>{card.value.toLocaleString("vi-VN")}</p>
        </article>
      ))}
    </div>
  );
}
