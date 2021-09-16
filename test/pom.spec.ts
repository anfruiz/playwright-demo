import test, { test as base } from "@playwright/test";
import { LogInPage } from "../src/pages/LogInPage";
import { HomePage } from "../src/pages/HomePage";
import { CartPage } from "../src/pages/CartPage";

test.use({
  storageState: "src/resources/Cart.json",
});

const fixtureTest = base.extend<{ cartPage: CartPage; logInPage: LogInPage }>({
  cartPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await logInPage.navigate("/");
    await logInPage.logIn("standard_user", "secret_sauce");
    await homePage.goToCart();
    await use(cartPage);
  },
  logInPage: async ({ page }, use) => {
    const logInPage = new LogInPage(page);
    await logInPage.navigate("/");
    await logInPage.logIn("locked_out_user", "secret_sauce");
    await use(logInPage);
  },
});

fixtureTest(
  `@POM
  Given I was in demosauce page
    When I loggin with wrong credentials
    Then I will see the message error`,
  async ({ logInPage }) => {
    fixtureTest
      .expect(await logInPage.getErrorMessageClassAttribute())
      .toBe("error-message-container error");
  }
);

fixtureTest(
  `@POM
  Given I was logged in demosauce
    When I add two products to cart
    Then I will see two items in the cart`,
  async ({ cartPage }) => {
    fixtureTest.expect(await cartPage.getCartItems()).toHaveLength(3);
  }
);

fixtureTest(
  `@POM
  Given I was logged in demosauce
    And I add two products to cart
    When I remove a product from the cart
    Then I will see one item in the cart`,
  async ({ cartPage }) => {
    fixtureTest.expect(await cartPage.getCartItems()).toHaveLength(3);
    await cartPage.removeItem("bolt-t-shirt");
    fixtureTest.expect(await cartPage.getCartItems()).toHaveLength(2);
  }
);

fixtureTest(
  `@POM
  Given I had items in the cart
    When I finish the purchase
    Then I will see the message 'THANK YOU FOR YOUR ORDER'`,
  async ({ cartPage }) => {
    cartPage.completePurchase({
      firstName: "Fake",
      lastName: "User",
      postalCode: "00000",
    });

    fixtureTest
      .expect(await cartPage.getMessage())
      .toBe("THANK YOU FOR YOUR ORDER");
  }
);
