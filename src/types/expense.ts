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
