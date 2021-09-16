import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");
  await page.click('[data-test="login-button"]');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  await page.click(".shopping_cart_link");
});

test(`Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`, async ({ page }) => {
  const items = await page.$$(".cart_item");
  expect(items).toHaveLength(3);
});

test(`Given I was logged in demosauce
    And I add two products to cart
    When I remove a product from the cart
    Then I will see one item in the cart`, async ({ page }) => {
  expect(await page.$$(".cart_item")).toHaveLength(3);
  await page.click("[data-test='remove-sauce-labs-bolt-t-shirt']");
  expect(await page.$$(".cart_item")).toHaveLength(2);
});

test(`Given I had items in the cart
    When I finish the purchase
    Then I will see the message 'THANK YOU FOR YOUR ORDER'`, async ({
  page,
}) => {
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', "Fake");
  await page.fill('[data-test="lastName"]', "User");
  await page.fill('[data-test="postalCode"]', "00000");
  await page.click('[data-test="continue"]');
  expect(await page.innerText(".summary_subtotal_label")).toContain("55.97");
  await page.click('[data-test="finish"]');
  expect(await page.innerText(".complete-header")).toBe(
    "THANK YOU FOR YOUR ORDER"
  );
});
