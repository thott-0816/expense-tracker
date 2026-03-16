import { expect, test } from "@playwright/test";

test("user can open the transaction workspace", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /giao dịch/i })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("button", { name: /lưu giao dịch/i })).toBeVisible();
});
