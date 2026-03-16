import { expect, test } from "@playwright/test";

test("user can open dashboard page", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: /dashboard thu chi/i })).toBeVisible();
});
