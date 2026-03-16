import { describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

const mocks = vi.hoisted(() => ({
  getMonthlyReportMock: vi.fn().mockResolvedValue({
    filter: { month: "2026-03", categoryId: "cat_food" },
    summary: {
      month: "2026-03",
      totalIncome: 25000000,
      totalExpense: 9500000,
      balance: 15500000,
      filterCategoryId: "cat_food",
    },
    barChart: {
      month: "2026-03",
      incomeAmount: 0,
      expenseAmount: 2500000,
      incomeColor: "green",
      expenseColor: "light-red",
    },
    pieChart: {
      month: "2026-03",
      items: [
        { categoryId: "cat_food", categoryName: "Ăn uống", amount: 2500000, ratio: 0.5814 },
        { categoryId: "cat_transport", categoryName: "Di chuyển", amount: 1800000, ratio: 0.4186 },
      ],
    },
    generatedAt: "2026-03-16T09:00:00.000Z",
  }),
}));

vi.mock("@/features/reports/report.service", () => ({
  reportService: {
    getMonthlyReport: mocks.getMonthlyReportMock,
  },
}));

import { GET } from "@/app/api/reports/monthly/route";

describe("/api/reports/monthly contract", () => {
  it("returns monthly report payload for valid month", async () => {
    const response = await GET(new Request("http://localhost/api/reports/monthly?month=2026-03"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.summary.month).toBe("2026-03");
    expect(body.barChart.incomeAmount).toBeTypeOf("number");
    expect(body.pieChart.items).toHaveLength(2);
  });

  it("keeps pie chart data even when category filter is applied", async () => {
    const response = await GET(new Request("http://localhost/api/reports/monthly?month=2026-03&categoryId=cat_food"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.summary.filterCategoryId).toBe("cat_food");
    expect(body.pieChart.items).toHaveLength(2);
  });

  it("returns validation error when month is missing", async () => {
    const response = await GET(new Request("http://localhost/api/reports/monthly"));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns validation error when month format is invalid", async () => {
    const response = await GET(new Request("http://localhost/api/reports/monthly?month=2026/03"));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns not found when category does not exist", async () => {
    mocks.getMonthlyReportMock.mockRejectedValueOnce(
      new ApiError("NOT_FOUND", "Danh mục không tồn tại", 404, [{ field: "categoryId", message: "Danh mục không tồn tại" }]),
    );

    const response = await GET(new Request("http://localhost/api/reports/monthly?month=2026-03&categoryId=unknown"));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error.code).toBe("NOT_FOUND");
  });
});
