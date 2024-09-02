import { test, expect, Page } from "@playwright/test";
import { Ticket } from "../src/types";
import { randomBytes } from "crypto";

const data: Omit<Ticket, "id"> = {
  name: randomBytes(20).toString("hex"),
  email: "email@google.com",
  description: "Ticket description",
};

const fillFormAndSubmit = async (page: Page) => {
  // Fill form data
  await page.fill("input[name='name']", data.name);
  await page.fill("input[name='email']", data.email);
  await page.fill("textarea[name='description']", data.description);

  // Submit the form
  await page.click('button[type="submit"]');
};

test.beforeEach(async ({ page }) => {
  // Navigate to the create page
  await page.goto("/create");
});

test("delete a ticket", async ({ page }) => {
  await fillFormAndSubmit(page);

  await page.goto("/");

  const expectedTicketList = `Ticket Creator: ${data.name}, Email: ${data.email}, Description: ${data.description}`;

  await expect(page.getByText(expectedTicketList).last()).toBeVisible();

  const buttonSelector = `li[role="listitem"]:has-text("${data.name}") div[role="button"]`;
  await page.locator(buttonSelector).click();

  await page.goto("create");
  await page.goto("/");

  await expect(page.getByText(data.name)).not.toBeVisible();
});
