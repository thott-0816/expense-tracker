import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/categories/category.service", () => ({
  categoryService: {
    listCategories: vi.fn().mockResolvedValue([
      {
        id: "cat_1",
        name: "Food",
        type: "expense",
        description: null,
        createdAt: "2026-03-14T00:00:00.000Z",
        updatedAt: "2026-03-14T00:00:00.000Z",
      },
    ]),
    createCategory: vi.fn().mockResolvedValue({
      id: "cat_2",
      name: "Salary",
      type: "income",
      description: null,
      createdAt: "2026-03-14T00:00:00.000Z",
      updatedAt: "2026-03-14T00:00:00.000Z",
    }),
  },
}));

import { GET, POST } from "@/app/api/categories/route";

describe("/api/categories contract", () => {
  it("returns categories collection", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.items).toHaveLength(1);
  });

  it("creates a category", async () => {
    const request = new Request("http://localhost/api/categories", {
      method: "POST",
      body: JSON.stringify({ name: "Salary", type: "income", description: "" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.name).toBe("Salary");
  });
});
