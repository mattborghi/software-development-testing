import { test, expect, Page } from "@playwright/test";
import { Ticket } from "../src/types";
import { fetchTickets } from "../app/actions";
import { getData } from "./utils";

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

test("create a new ticket", async ({ page }) => {
  await fillFormAndSubmit(page);

  // Assert that the ticket was created successfully
  await expect(page.locator("h3")).toHaveText("Ticket submitted correctly!");
});

test("assess ticket is listed as expected", async ({ page }) => {
  const data = await fillFormAndSubmit(page);

  await page.goto("/");

  const expectedTicketList = `Ticket Creator: ${data.name}, Email: ${data.email}, Description: ${data.description}`;

  await expect(page.getByText(expectedTicketList).last()).toBeVisible();
});

test("should update db after creating ticket", async ({ page }) => {
  const submittedTicket = await fillFormAndSubmit(page);

  await page.goto("/");

  const response = await fetchTickets();
  const { data } = await response.json();

  const ticket = (data as Ticket[]).find(
    (item) => item.name === submittedTicket.name
  );
  if (!ticket) {
    throw Error("Ticket should be defined.");
  }
  const { id, ...receivedTicket } = ticket;

  expect(submittedTicket).toEqual(receivedTicket);
});
