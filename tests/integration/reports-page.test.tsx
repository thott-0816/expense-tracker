import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const setFiltersMock = vi.fn();
const resetCategoryFilterMock = vi.fn();
const useReportsMock = vi.fn();

function buildUseReportsState(overrides?: Record<string, unknown>) {
  return {
    categories: [
      {
        id: "cat_food",
        name: "Ăn uống",
        type: "expense",
        description: null,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "cat_transport",
        name: "Di chuyển",
        type: "expense",
        description: null,
        createdAt: "",
        updatedAt: "",
      },
    ],
    data: {
      filter: { month: "2026-03", categoryId: "" },
      summary: {
        month: "2026-03",
        totalIncome: 25000000,
        totalExpense: 9500000,
        balance: 15500000,
        filterCategoryId: null,
      },
      barChart: {
        month: "2026-03",
        incomeAmount: 25000000,
        expenseAmount: 9500000,
        incomeColor: "green",
        expenseColor: "light-red",
      },
      pieChart: {
        month: "2026-03",
        items: [
          { categoryId: "cat_food", categoryName: "Ăn uống", amount: 6500000, ratio: 0.6842 },
          { categoryId: "cat_transport", categoryName: "Di chuyển", amount: 3000000, ratio: 0.3158 },
        ],
      },
      generatedAt: "2026-03-16T09:00:00.000Z",
    },
    loading: false,
    refreshing: false,
    error: null,
    filters: { month: "2026-03", categoryId: "cat_food" },
    setFilters: setFiltersMock,
    resetCategoryFilter: resetCategoryFilterMock,
    refresh: vi.fn(),
    ...overrides,
  };
}

vi.mock("@/features/reports/use-reports", () => ({
  useReports: () => useReportsMock(),
}));

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PieChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  Pie: () => <div />,
  Cell: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

import ReportsPage from "@/app/reports/page";

describe("reports page integration", () => {
  beforeEach(() => {
    setFiltersMock.mockReset();
    resetCategoryFilterMock.mockReset();
    useReportsMock.mockReturnValue(buildUseReportsState());
  });

  it("renders monthly summary and filters", () => {
    render(<ReportsPage />);

    expect(screen.getByRole("search", { name: /bộ lọc báo cáo/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/tháng báo cáo/i)).toBeInTheDocument();
    expect(screen.getByText("Tổng thu")).toBeInTheDocument();
    expect(screen.getByText(/25.000.000/i)).toBeInTheDocument();
  });

  it("renders loading state", () => {
    useReportsMock.mockReturnValue(buildUseReportsState({ loading: true, data: null }));
    render(<ReportsPage />);
    expect(screen.getByText(/đang tải dữ liệu báo cáo/i)).toBeInTheDocument();
  });

  it("renders empty state when selected month has no data", () => {
    useReportsMock.mockReturnValue(
      buildUseReportsState({
        data: {
          ...buildUseReportsState().data,
          summary: {
            month: "2026-04",
            totalIncome: 0,
            totalExpense: 0,
            balance: 0,
            filterCategoryId: null,
          },
          barChart: {
            month: "2026-04",
            incomeAmount: 0,
            expenseAmount: 0,
            incomeColor: "green",
            expenseColor: "light-red",
          },
          pieChart: { month: "2026-04", items: [] },
        },
      }),
    );
    render(<ReportsPage />);
    expect(screen.getByText(/không có dữ liệu phù hợp với bộ lọc hiện tại/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    useReportsMock.mockReturnValue(buildUseReportsState({ error: "Không thể tải dữ liệu báo cáo lúc này" }));
    render(<ReportsPage />);
    expect(screen.getByRole("alert")).toHaveTextContent(/không thể tải dữ liệu báo cáo lúc này/i);
  });

  it("shows reset category button", () => {
    render(<ReportsPage />);

    const [resetButton] = screen.getAllByRole("button", { name: /đặt lại bộ lọc/i });
    fireEvent.click(resetButton);

    expect(resetButton).toBeInTheDocument();
    expect(resetCategoryFilterMock).toHaveBeenCalled();
  });

  it("updates filter state when month changes", () => {
    render(<ReportsPage />);

    const [monthInput] = screen.getAllByLabelText(/tháng báo cáo/i);
    fireEvent.change(monthInput, { target: { value: "2026-04" } });

    expect(setFiltersMock).toHaveBeenCalled();
  });

  it("shows refresh hint for same-session updates", () => {
    useReportsMock.mockReturnValue(buildUseReportsState({ refreshing: true }));
    render(<ReportsPage />);

    expect(screen.getByText(/đang làm mới dữ liệu/i)).toBeInTheDocument();
  });

  it("renders two-bar chart section and pie legend categories", () => {
    render(<ReportsPage />);

    expect(screen.getAllByLabelText(/biểu đồ cột thu chi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ăn uống/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/di chuyển/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/chú thích cơ cấu chi tiêu/i).length).toBeGreaterThan(0);
  });
});
