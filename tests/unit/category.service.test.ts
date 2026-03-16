import { describe, expect, it, vi } from "vitest";

import { createCategoryService } from "@/features/categories/category.service";

describe("category service", () => {
  it("creates a category with normalized optional description", async () => {
    const repository = {
      listCategories: vi.fn(),
      getCategoryById: vi.fn(),
      createCategory: vi.fn().mockResolvedValue({
        id: "cat_1",
        name: "Food",
        type: "expense",
        description: null,
        createdAt: "2026-03-14T00:00:00.000Z",
        updatedAt: "2026-03-14T00:00:00.000Z",
      }),
    };

    const service = createCategoryService(repository);
    const result = await service.createCategory({
      name: "Food",
      type: "expense",
      description: "",
    });

    expect(repository.createCategory).toHaveBeenCalledWith({
      name: "Food",
      type: "expense",
      description: null,
    });
    expect(result.name).toBe("Food");
  });
});
