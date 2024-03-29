import { test, expect } from "@playwright/test";

/**
 * This is a basic example of Playwright without use POM and other features 
 */
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

test('El carrito de compras debe tener productos', async ({ page }) => {
  const items = await page.$$(".cart_item");
  expect(items).toHaveLength(3);
});

test('Eliminar un producto del carrito de compras', async ({ page }) => {
  expect(await page.$$(".cart_item")).toHaveLength(3);
  await page.click("[data-test='remove-sauce-labs-bolt-t-shirt']");
  expect(await page.$$(".cart_item")).toHaveLength(2);
});

test('Completar una compra', async ({
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
