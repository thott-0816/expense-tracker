import type { Category, Prisma, Transaction } from "@prisma/client";

import type {
  CategoryRecord,
  DashboardAggregate,
  DashboardBreakdownItem,
  TransactionRecord,
} from "@/types/expense";

function decimalToNumber(value: Prisma.Decimal | number): number {
  return Number(value);
}

export function toCategoryRecord(category: Category): CategoryRecord {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    description: category.description,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}

type TransactionWithCategory = Transaction & {
  category?: Pick<Category, "name">;
};

export function toTransactionRecord(transaction: TransactionWithCategory): TransactionRecord {
  return {
    id: transaction.id,
    kind: transaction.kind,
    amount: decimalToNumber(transaction.amount),
    occurredAt: transaction.occurredAt.toISOString().slice(0, 10),
    categoryId: transaction.categoryId,
    categoryName: transaction.category?.name,
    note: transaction.note,
    createdAt: transaction.createdAt.toISOString(),
    updatedAt: transaction.updatedAt.toISOString(),
  };
}

export function toDashboardAggregate(
  period: DashboardAggregate["period"],
  totalIncome: number,
  totalExpense: number,
  categoryBreakdown: DashboardBreakdownItem[],
): DashboardAggregate {
  return {
    period,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryBreakdown,
  };
}
