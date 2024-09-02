import { test, expect, Page } from "@playwright/test";
import { Ticket } from "../src/types";
import * as crypto from "node:crypto";

const data: Omit<Ticket, "id"> = {
  name: crypto.randomBytes(20).toString("hex"),
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

test("create a new ticket", async ({ page }) => {
  fillFormAndSubmit(page);

  // Assert that the ticket was created successfully
  await expect(page.locator("h3")).toHaveText("Ticket submitted correctly!");
});

test("assess ticket is listed as expected", async ({ page }) => {
  await fillFormAndSubmit(page);

  await page.goto("/");

  const expectedTicketList = `Ticket Creator: ${data.name}, Email: ${data.email}, Description: ${data.description}`;

  await expect(page.getByText(expectedTicketList).last()).toBeVisible();
});
