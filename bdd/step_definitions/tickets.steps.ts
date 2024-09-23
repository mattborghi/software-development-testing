import { Given, Then, When, world } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";
import { getPageUrl } from "../support/utils";
import { getData } from "../../e2e/utils";
import { fetchTickets } from "../../app/actions";
import { Ticket } from "../../src/types";

Given(
  "User visits {string} page",
  async function (this: ICustomWorld, p: string) {
    const url = getPageUrl(p);
    const page = this.page!;
    await page.goto(url);
  }
);

When("User completes form", async function (this: ICustomWorld) {
  const data = getData();
  world.data = data;
  const page = this.page!;
  await page.fill("input[name='name']", data.name);
  await page.fill("input[name='email']", data.email);
  await page.fill("textarea[name='description']", data.description);
});

When("User submits form", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.click('button[type="submit"]');
});

When("User deletes ticket", async function (this: ICustomWorld) {
  if (!world.data) {
    throw new Error("Data should not be empty!");
  }
  const page = this.page!;
  const buttonSelector = `li[role="listitem"]:has-text("${world.data.name}") div[role="button"]`;
  await page.locator(buttonSelector).click();
});

Then("User sees the list of tickets", async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator("h1")).toHaveText("Tickets");
});

Then("Page should show ticket submission", async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.locator("h3")).toHaveText("Ticket submitted correctly!");
});

Then("Form is displayed as expected", async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Create ticket"
  );
});

Then("Ticket is not present", async function (this: ICustomWorld) {
  if (!world.data) {
    throw new Error("Data should not be empty!");
  }
  const page = this.page!;
  await expect(page.getByText(world.data.name)).not.toBeVisible();
});

Then(
  "DB should be updated with created ticket",
  async function (this: ICustomWorld) {
    const submittedTicket = world.data;
    if (!submittedTicket) {
      throw new Error("Data should not be empty!");
    }
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
  }
);
