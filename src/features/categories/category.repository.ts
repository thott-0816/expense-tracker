import type { CategoryType } from "@/types/expense";

import { getDbClient } from "@/lib/db/transaction-context";
import { toCategoryRecord } from "@/lib/db/mappers";

type CreateCategoryParams = {
  name: string;
  type: CategoryType;
  description: string | null;
};

export const categoryRepository = {
  async listCategories() {
    const categories = await getDbClient().category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map(toCategoryRecord);
  },

  async getCategoryById(id: string) {
    const category = await getDbClient().category.findUnique({ where: { id } });
    return category ? toCategoryRecord(category) : null;
  },

  async createCategory(params: CreateCategoryParams) {
    const category = await getDbClient().category.create({
      data: params,
    });

    return toCategoryRecord(category);
  },
};
