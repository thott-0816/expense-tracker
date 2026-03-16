import { ApiError } from "@/lib/api/errors";

import type { CreateCategoryInput } from "@/lib/validation/category";

import { categoryRepository } from "@/features/categories/category.repository";

type CategoryRepository = typeof categoryRepository;

export function createCategoryService(repository: CategoryRepository) {
  return {
    listCategories: () => repository.listCategories(),

    async createCategory(input: CreateCategoryInput) {
      try {
        return await repository.createCategory({
          ...input,
          description: input.description?.trim() ? input.description.trim() : null,
        });
      } catch (error) {
        if (error instanceof Error && error.message.includes("Unique constraint")) {
          throw new ApiError("CONFLICT", "Danh mục đã tồn tại", 409, [
            { field: "name", message: "Danh mục đã tồn tại" },
          ]);
        }

        throw error;
      }
    },
  };
}

export const categoryService = createCategoryService(categoryRepository);
