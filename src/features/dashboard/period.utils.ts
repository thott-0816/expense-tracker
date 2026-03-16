import type { DashboardPeriod } from "@/types/expense";

export function getPeriodLabel(period: DashboardPeriod) {
  switch (period) {
    case "day":
      return "Ngày";
    case "week":
      return "Tuần";
    case "month":
      return "Tháng";
  }
}
