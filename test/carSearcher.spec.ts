import { expect, test } from "@playwright/test";
import { Tu360Page } from "../src/pages/tu360Page";

test("Car Searcher Form", async ({ page }) => {
  const homePage = new Tu360Page(page);

  await homePage.goto();
  await homePage.searchCar();
  await page.pause();
  const title = await homePage.searchButton();
  expect(await homePage.searchButton()).toBeTruthy;
});
