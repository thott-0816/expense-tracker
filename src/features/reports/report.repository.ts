import { getDbClient } from "@/lib/db/transaction-context";

type ReportFilter = {
  month: string;
  categoryId?: string;
};

type ReportSourceData = {
  filteredItems: Array<{ kind: "income" | "expense"; amount: number }>;
  monthlyExpenseItems: Array<{ categoryId: string; categoryName: string; amount: number }>;
};

function toMonthRange(month: string) {
  const [yearRaw, monthRaw] = month.split("-");
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;

  const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59, 999));

  return { start, end };
}

export const reportRepository = {
  async categoryExists(categoryId: string) {
    const category = await getDbClient().category.findUnique({ where: { id: categoryId }, select: { id: true } });
    return Boolean(category);
  },

  async getMonthlyReportSource(filter: ReportFilter): Promise<ReportSourceData> {
    const { start, end } = toMonthRange(filter.month);

    const whereByMonth = {
      occurredAt: {
        gte: start,
        lte: end,
      },
    };

    const filteredRows = await getDbClient().transaction.groupBy({
      where: {
        ...whereByMonth,
        ...(filter.categoryId ? { categoryId: filter.categoryId } : {}),
      },
      by: ["kind"],
      _sum: {
        amount: true,
      },
    });

    const monthlyExpenseRows = await getDbClient().transaction.groupBy({
      where: {
        ...whereByMonth,
        kind: "expense",
      },
      by: ["categoryId"],
      _sum: {
        amount: true,
      },
    });

    const categories = await getDbClient().category.findMany({
      where: {
        id: {
          in: monthlyExpenseRows.map((row) => row.categoryId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

    return {
      filteredItems: filteredRows.map((row) => ({
        kind: row.kind,
        amount: Number(row._sum.amount ?? 0),
      })),
      monthlyExpenseItems: monthlyExpenseRows.map((row) => ({
        categoryId: row.categoryId,
        categoryName: categoryNameById.get(row.categoryId) ?? "Không xác định",
        amount: Number(row._sum.amount ?? 0),
      })),
    };
  },
};
