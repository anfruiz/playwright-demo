import { Page } from "playwright";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(item) {
    const removeButton = this.page.locator(
      `[data-test='remove-sauce-labs-${item}']`
    );

    await removeButton.click();
  }

  async completePurchase(userInfo) {
    const checkoutButton = this.page.locator('[data-test="checkout"]');
    const firstNameInput = this.page.locator('[data-test="firstName"]');
    const lastNameInput = this.page.locator('[data-test="lastName"]');
    const postalCodeInput = this.page.locator('[data-test="postalCode"]');
    const continueButton = this.page.locator('[data-test="continue"]');
    const finishButton = this.page.locator('[data-test="finish"]');

    await checkoutButton.click();
    await firstNameInput.fill(userInfo.firstName);
    await lastNameInput.fill(userInfo.lastName);
    await postalCodeInput.fill(userInfo.postalCode);
    await continueButton.click();
    await finishButton.click();
  }

  async getMessage() {
    const completePurchaseMessage = this.page.locator(".complete-header");

    return await completePurchaseMessage.innerText();
  }

  async getCartItems() {
     const cartItems = this.page.locator(".cart_item");
     
    return await cartItems.elementHandles();
  }
}
