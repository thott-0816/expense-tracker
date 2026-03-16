export type CategoryType = "income" | "expense" | "both";
export type TransactionKind = "income" | "expense";
export type DashboardPeriod = "day" | "week" | "month";

export type CategoryRecord = {
  id: string;
  name: string;
  type: CategoryType;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TransactionRecord = {
  id: string;
  kind: TransactionKind;
  amount: number;
  occurredAt: string;
  categoryId: string;
  categoryName?: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FilterQuery = {
  fromDate?: string;
  toDate?: string;
  kind?: TransactionKind | "all";
  categoryId?: string;
  keyword?: string;
  period?: DashboardPeriod;
};

export type PaginationQuery = {
  page?: number;
  pageSize?: number;
};

export type PaginatedTransactions = {
  items: TransactionRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type DashboardBreakdownItem = {
  categoryId: string;
  categoryName: string;
  amount: number;
  ratio: number;
};

export type DashboardAggregate = {
  period: DashboardPeriod;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown: DashboardBreakdownItem[];
};

export type ReportFilter = {
  month: string;
  categoryId?: string;
};

export type MonthlyReportSummary = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  filterCategoryId: string | null;
};

export type MonthlyIncomeExpenseSeries = {
  month: string;
  incomeAmount: number;
  expenseAmount: number;
  incomeColor: string;
  expenseColor: string;
};

export type CategoryExpenseSlice = {
  categoryId: string;
  categoryName: string;
  amount: number;
  ratio: number;
};

export type CategoryExpenseDistribution = {
  month: string;
  items: CategoryExpenseSlice[];
};

export type MonthlyReportResponse = {
  filter: ReportFilter;
  summary: MonthlyReportSummary;
  barChart: MonthlyIncomeExpenseSeries;
  pieChart: CategoryExpenseDistribution;
  generatedAt: string;
};
