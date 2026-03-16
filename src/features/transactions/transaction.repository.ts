import { Prisma } from "@prisma/client";

import type { FilterQuery, PaginatedTransactions, PaginationQuery } from "@/types/expense";

import { getDbClient } from "@/lib/db/transaction-context";
import { toTransactionRecord } from "@/lib/db/mappers";

type CreateTransactionParams = {
  kind: "income" | "expense";
  amount: number;
  occurredAt: string;
  categoryId: string;
  note: string | null;
};

type UpdateTransactionParams = Partial<CreateTransactionParams>;

function buildWhere(filter: FilterQuery = {}) {
  const where: Prisma.TransactionWhereInput = {};

  if (filter.kind && filter.kind !== "all") {
    where.kind = filter.kind;
  }

  if (filter.categoryId) {
    where.categoryId = filter.categoryId;
  }

  if (filter.fromDate || filter.toDate) {
    where.occurredAt = {};
    if (filter.fromDate) {
      where.occurredAt.gte = new Date(filter.fromDate);
    }
    if (filter.toDate) {
      const end = new Date(filter.toDate);
      end.setHours(23, 59, 59, 999);
      where.occurredAt.lte = end;
    }
  }

  if (filter.keyword) {
    where.OR = [
      { note: { contains: filter.keyword } },
      { category: { name: { contains: filter.keyword } } },
    ];
  }

  return where;
}

export const transactionRepository = {
  async listTransactions(filter: FilterQuery = {}, pagination: PaginationQuery = {}): Promise<PaginatedTransactions> {
    const requestedPage = Math.max(1, pagination.page ?? 1);
    const pageSize = Math.min(Math.max(1, pagination.pageSize ?? 10), 100);
    const where = buildWhere(filter);

    const total = await getDbClient().transaction.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(requestedPage, totalPages);

    const transactions = await getDbClient().transaction.findMany({
      where,
      include: { category: { select: { name: true } } },
      orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      items: transactions.map(toTransactionRecord),
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getTransactionById(id: string) {
    const transaction = await getDbClient().transaction.findUnique({
      where: { id },
      include: { category: { select: { name: true } } },
    });

    return transaction ? toTransactionRecord(transaction) : null;
  },

  async createTransaction(params: CreateTransactionParams) {
    const transaction = await getDbClient().transaction.create({
      data: {
        ...params,
        amount: new Prisma.Decimal(params.amount),
        occurredAt: new Date(params.occurredAt),
      },
      include: { category: { select: { name: true } } },
    });

    return toTransactionRecord(transaction);
  },

  async updateTransaction(id: string, params: UpdateTransactionParams) {
    const transaction = await getDbClient().transaction.update({
      where: { id },
      data: {
        ...(params.kind ? { kind: params.kind } : {}),
        ...(params.amount !== undefined ? { amount: new Prisma.Decimal(params.amount) } : {}),
        ...(params.occurredAt ? { occurredAt: new Date(params.occurredAt) } : {}),
        ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params.note !== undefined ? { note: params.note } : {}),
      },
      include: { category: { select: { name: true } } },
    });

    return toTransactionRecord(transaction);
  },

  async deleteTransaction(id: string) {
    await getDbClient().transaction.delete({ where: { id } });
  },
};
