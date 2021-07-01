import { test, expect } from "@playwright/test";

test.describe("Whithout Storage", () => {
  test(`Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click(
      '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
    );
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await page.click(".shopping_cart_link");
    const items = await page.$$(".cart_item");
    expect(items).toHaveLength(2);
  });
});

test.describe("Whith Storage", () => {
  test.use({
    storageState: "src/resources/Cart.json",
  });

  test(`Given I was logged in demosauce
    And I add two products to cart
    When I remove a product from the cart
    Then I will see one item in the cart`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click(".shopping_cart_link");
    await page.click("[data-test='remove-sauce-labs-bolt-t-shirt']");
    expect(await page.$$(".cart_item")).toHaveLength(2);
  });
});
