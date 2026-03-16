import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/dashboard/dashboard.service", () => ({
  dashboardService: {
    getDashboardAggregate: vi.fn().mockResolvedValue({
      period: "month",
      totalIncome: 25000000,
      totalExpense: 9500000,
      balance: 15500000,
      categoryBreakdown: [
        {
          categoryId: "cat_1",
          categoryName: "Food",
          amount: 2500000,
          ratio: 0.2632,
        },
      ],
    }),
  },
}));

import { GET } from "@/app/api/dashboard/route";

describe("/api/dashboard contract", () => {
  it("returns the aggregate payload for a period", async () => {
    const response = await GET(new Request("http://localhost/api/dashboard?period=month"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.period).toBe("month");
    expect(body.balance).toBe(15500000);
  });
});
