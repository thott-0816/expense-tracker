import { expect, test } from "@playwright/test";

test("user can see filter toolbar on transaction workspace", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("textbox", { name: /tìm kiếm/i })).toBeVisible();
});
