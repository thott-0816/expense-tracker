import { expect, test } from "@playwright/test";

test("user can open reports tab and see report widgets", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /báo cáo/i }).click();

  await expect(page.getByRole("search", { name: /bộ lọc báo cáo/i })).toBeVisible();
  await expect(page.getByText(/tổng thu/i)).toBeVisible();
  await expect(page.getByText(/biểu đồ cột thu chi/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /cơ cấu chi tiêu theo danh mục/i })).toBeVisible();
});

test("user can filter by category, reset filter, and see same-session refresh", async ({ page }) => {
  await page.route("**/api/categories", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "cat_food",
            name: "Ăn uống",
            type: "expense",
            description: null,
            createdAt: "2026-03-01T00:00:00.000Z",
            updatedAt: "2026-03-01T00:00:00.000Z",
          },
        ],
      }),
    });
  });

  let requestCount = 0;
  await page.route("**/api/reports/monthly?**", async (route) => {
    requestCount += 1;
    const url = new URL(route.request().url());
    const categoryId = url.searchParams.get("categoryId");

    const body =
      requestCount >= 4
        ? {
            filter: { month: "2026-03", categoryId: categoryId ?? "" },
            summary: {
              month: "2026-03",
              totalIncome: 25000000,
              totalExpense: 12000000,
              balance: 13000000,
              filterCategoryId: categoryId,
            },
            barChart: {
              month: "2026-03",
              incomeAmount: 25000000,
              expenseAmount: 12000000,
              incomeColor: "green",
              expenseColor: "light-red",
            },
            pieChart: {
              month: "2026-03",
              items: [{ categoryId: "cat_food", categoryName: "Ăn uống", amount: 12000000, ratio: 1 }],
            },
            generatedAt: "2026-03-16T09:02:00.000Z",
          }
        : categoryId
          ? {
              filter: { month: "2026-03", categoryId },
              summary: {
                month: "2026-03",
                totalIncome: 0,
                totalExpense: 3000000,
                balance: -3000000,
                filterCategoryId: categoryId,
              },
              barChart: {
                month: "2026-03",
                incomeAmount: 0,
                expenseAmount: 3000000,
                incomeColor: "green",
                expenseColor: "light-red",
              },
              pieChart: {
                month: "2026-03",
                items: [{ categoryId: "cat_food", categoryName: "Ăn uống", amount: 9500000, ratio: 1 }],
              },
              generatedAt: "2026-03-16T09:01:00.000Z",
            }
          : {
              filter: { month: "2026-03", categoryId: "" },
              summary: {
                month: "2026-03",
                totalIncome: 25000000,
                totalExpense: 9500000,
                balance: 15500000,
                filterCategoryId: null,
              },
              barChart: {
                month: "2026-03",
                incomeAmount: 25000000,
                expenseAmount: 9500000,
                incomeColor: "green",
                expenseColor: "light-red",
              },
              pieChart: {
                month: "2026-03",
                items: [{ categoryId: "cat_food", categoryName: "Ăn uống", amount: 9500000, ratio: 1 }],
              },
              generatedAt: "2026-03-16T09:00:00.000Z",
            };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });

  await page.goto("/reports");
  const totalExpenseCard = page.locator("article").filter({ hasText: /^Tổng chi/ });
  await expect(totalExpenseCard.locator("p").nth(1)).toHaveText("9.500.000");

  await page.getByLabel(/danh mục lọc báo cáo/i).selectOption("cat_food");
  await expect(totalExpenseCard.locator("p").nth(1)).toHaveText("3.000.000");

  await page.getByRole("button", { name: /đặt lại bộ lọc/i }).click();
  await expect(page.getByLabel(/danh mục lọc báo cáo/i)).toHaveValue("");

  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(totalExpenseCard.locator("p").nth(1)).toHaveText("12.000.000");
});

test("pie chart keeps monthly category composition when category filter is active", async ({ page }) => {
  await page.route("**/api/categories", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "cat_food",
            name: "Ăn uống",
            type: "expense",
            description: null,
            createdAt: "2026-03-01T00:00:00.000Z",
            updatedAt: "2026-03-01T00:00:00.000Z",
          },
          {
            id: "cat_transport",
            name: "Di chuyển",
            type: "expense",
            description: null,
            createdAt: "2026-03-01T00:00:00.000Z",
            updatedAt: "2026-03-01T00:00:00.000Z",
          },
        ],
      }),
    });
  });

  await page.route("**/api/reports/monthly?**", async (route) => {
    const url = new URL(route.request().url());
    const categoryId = url.searchParams.get("categoryId");

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        filter: { month: "2026-03", categoryId: categoryId ?? "" },
        summary: {
          month: "2026-03",
          totalIncome: 0,
          totalExpense: categoryId ? 3000000 : 9500000,
          balance: categoryId ? -3000000 : -9500000,
          filterCategoryId: categoryId,
        },
        barChart: {
          month: "2026-03",
          incomeAmount: 0,
          expenseAmount: categoryId ? 3000000 : 9500000,
          incomeColor: "green",
          expenseColor: "light-red",
        },
        pieChart: {
          month: "2026-03",
          items: [
            { categoryId: "cat_food", categoryName: "Ăn uống", amount: 6500000, ratio: 0.6842 },
            { categoryId: "cat_transport", categoryName: "Di chuyển", amount: 3000000, ratio: 0.3158 },
          ],
        },
        generatedAt: "2026-03-16T09:00:00.000Z",
      }),
    });
  });

  await page.goto("/reports");
  await page.getByLabel(/danh mục lọc báo cáo/i).selectOption("cat_food");

  const legend = page.getByLabel("Chú thích cơ cấu chi tiêu");
  await expect(legend.getByText("Ăn uống")).toBeVisible();
  await expect(legend.getByText("Di chuyển")).toBeVisible();
});
