import { test, expect, Page } from "@playwright/test";
import { Ticket } from "../src/types";
import { getData } from "./utils";
import { fetchTickets } from "../app/actions";

const fillFormAndSubmit = async (page: Page) => {
  const data = getData();

  // Fill form data
  await page.fill("input[name='name']", data.name);
  await page.fill("input[name='email']", data.email);
  await page.fill("textarea[name='description']", data.description);

  // Submit the form
  await page.click('button[type="submit"]');

  return data;
};

test.beforeEach(async ({ page }) => {
  // Navigate to the create page
  await page.goto("/create");
});

test("delete a ticket", async ({ page }) => {
  const data = await fillFormAndSubmit(page);

  await page.goto("/");

  const expectedTicketList = `Ticket Creator: ${data.name}, Email: ${data.email}, Description: ${data.description}`;

  await expect(page.getByText(expectedTicketList).last()).toBeVisible();

  const buttonSelector = `li[role="listitem"]:has-text("${data.name}") div[role="button"]`;
  await page.locator(buttonSelector).click();

  await page.goto("create");
  await page.goto("/");

  await expect(page.getByText(data.name)).not.toBeVisible();
});

test("should update db after deleting ticket", async ({ page }) => {
  const submittedTicket = await fillFormAndSubmit(page);

  await page.goto("/");

  const buttonSelector = `li[role="listitem"]:has-text("${submittedTicket.name}") div[role="button"]`;
  await page.locator(buttonSelector).click();

  await page.goto("create");
  await page.goto("/");

  const response = await fetchTickets();
  const { data } = await response.json();

  const receivedTicket = (data as Ticket[]).find(
    (item) => item.name === submittedTicket.name
  );

  expect(receivedTicket).toBeUndefined();
});
