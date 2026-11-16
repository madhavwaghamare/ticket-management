import { expect, test } from "@playwright/test";

// Full-stack check: the client reaches the Express API through the Vite proxy.
test("home page shows the API as connected", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/connected \(uptime \d+s\)/)).toBeVisible();
});
