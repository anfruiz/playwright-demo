import { chromium } from "@playwright/test";
import { LogInPage } from "./src/pages/LogInPage";
import { HomePage } from "./src/pages/HomePage";

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logInPage = new LogInPage(page);
  const homePage = new HomePage(page);
  await logInPage.navigate("https://www.saucedemo.com");
  await logInPage.logIn("standard_user", "secret_sauce");
  await homePage.addToCart("backpack");
  await homePage.addToCart("bike-light");
  await homePage.addToCart("bolt-t-shirt");
  await page.context().storageState({ path: "src/resources/Cart.json" });
}

export default globalSetup;
