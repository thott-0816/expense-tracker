import type { MonthlyReportSummary } from "@/types/expense";

type ReportSummaryProps = {
  summary: MonthlyReportSummary;
};

export function ReportSummary({ summary }: ReportSummaryProps) {
  const cards = [
    { label: "Tổng thu", value: summary.totalIncome, tone: "text-emerald-600" },
    { label: "Tổng chi", value: summary.totalExpense, tone: "text-rose-600" },
    { label: "Số dư", value: summary.balance, tone: "text-sky-700" },
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
