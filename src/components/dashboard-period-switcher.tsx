import type { DashboardPeriod } from "@/types/expense";

type DashboardPeriodSwitcherProps = {
  period: DashboardPeriod;
  onChange: (period: DashboardPeriod) => void;
};

const periods: DashboardPeriod[] = ["day", "week", "month"];

export function DashboardPeriodSwitcher({ period, onChange }: DashboardPeriodSwitcherProps) {
  return (
    <div aria-label="Chọn kỳ báo cáo" className="inline-flex rounded-full border border-zinc-200 bg-white p-1" role="tablist">
      {periods.map((value) => (
        <button
          aria-selected={period === value}
          key={value}
          className={`rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${period === value ? "bg-zinc-950 text-white" : "text-zinc-600"}`}
          onClick={() => onChange(value)}
          role="tab"
          tabIndex={period === value ? 0 : -1}
          type="button"
        >
          {value === "day" ? "Ngày" : value === "week" ? "Tuần" : "Tháng"}
        </button>
      ))}
    </div>
  );
}
