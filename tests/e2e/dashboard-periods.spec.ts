import { expect, test } from "@playwright/test";

test("user can open dashboard page", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("link", { name: /dashboard/i })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText(/tổng thu/i)).toBeVisible();
});
