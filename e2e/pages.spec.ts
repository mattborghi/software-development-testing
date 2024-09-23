import { test, expect } from "@playwright/test";

test("should navigate to the create page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'About Page' and click on it
  await page.getByText("Create new Ticket").click();
  // The new url should be "/create" (baseURL is used there)
  await expect(page).toHaveURL("/create");
  // The new page should contain an h1 with "About Page"
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Create ticket"
  );
});
