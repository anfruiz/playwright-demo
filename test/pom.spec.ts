import test, { test as base } from "@playwright/test";
import { LogInPage } from "../src/pages/LogInPage";
import { HomePage } from "../src/pages/HomePage";
import { CartPage } from "../src/pages/CartPage";

test.use({
  storageState: "src/resources/Cart.json",
});

const cartTest = base.extend<{ cartPage: CartPage }>({
  cartPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await logInPage.navigate();
    await logInPage.logIn("standard_user", "secret_sauce");
    //await homePage.addToCart("backpack");
    //await homePage.addToCart("bike-light");
    //await homePage.addToCart("bolt-t-shirt");
    await homePage.goToCart();
    await use(cartPage);
  },
});

const loginTest = base.extend<{ logInPage: LogInPage }>({
  logInPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);
    await logInPage.navigate();
    await logInPage.logIn("locked_out_user", "secret_sauce");
    await use(logInPage);
  },
});

loginTest(
  `Given I was in demosauce page
    When I loggin with wrong credentials
    Then I will see the message error`,
  async ({ logInPage }) => {
    loginTest
      .expect(await logInPage.getErrorMessageClassAttribute())
      .toBe("error-message-container error");
  }
);

cartTest(
  `Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`,
  async ({ cartPage }) => {
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(3);
  }
);

cartTest(
  `Given I was logged in demosauce
    And I add two products to cart
    When I remove a product from the cart
    Then I will see one item in the cart`,
  async ({ cartPage }) => {
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(3);
    await cartPage.removeItem("bolt-t-shirt");
    cartTest.expect(await cartPage.getCartItems()).toHaveLength(2);
  }
);

cartTest(
  `Given I had items in the cart
    When I finish the purchase
    Then I will see the message 'THANK YOU FOR YOUR ORDER'`,
  async ({ cartPage }) => {
    cartPage.completePurchase();

    cartTest
      .expect(await cartPage.getMessage())
      .toBe("THANK YOU FOR YOUR ORDER");
  }
);
