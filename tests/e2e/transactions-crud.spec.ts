import { expect, test } from "@playwright/test";

test("user can open the transaction workspace", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /quản lý giao dịch/i })).toBeVisible();
});
