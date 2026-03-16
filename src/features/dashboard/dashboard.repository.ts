import { prisma } from "@/lib/db/prisma";

import type { DashboardPeriod, TransactionKind } from "@/types/expense";

export type DashboardSourceItem = {
  kind: TransactionKind;
  amount: number;
  categoryId: string;
  categoryName: string;
};

export async function listDashboardSourceData(input: {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
}): Promise<DashboardSourceItem[]> {
  const where = input.fromDate || input.toDate ? { occurredAt: {} as { gte?: Date; lte?: Date } } : undefined;

  if (where?.occurredAt) {
    if (input.fromDate) {
      where.occurredAt.gte = new Date(input.fromDate);
    }
    if (input.toDate) {
      const end = new Date(input.toDate);
      end.setHours(23, 59, 59, 999);
      where.occurredAt.lte = end;
    }
  }

  const rows = await prisma.transaction.findMany({
    where,
    select: {
      kind: true,
      amount: true,
      categoryId: true,
      category: { select: { name: true } },
    },
  });

  return rows.map((row) => ({
    kind: row.kind,
    amount: Number(row.amount),
    categoryId: row.categoryId,
    categoryName: row.category.name,
  }));
}
