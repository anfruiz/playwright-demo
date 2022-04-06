import { Locator, Page } from "playwright";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completePurchaseMessage: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completePurchaseMessage = page.locator(".complete-header");
    this.cartItems = page.locator(".cart_item");
  }

  async removeItem(item) {
    const removeButton = this.page.locator(
      `[data-test='remove-sauce-labs-${item}']`
    );

    await removeButton.click();
  }

  async completePurchase(userInfo) {
    await this.checkoutButton.click();
    await this.firstNameInput.fill(userInfo.firstName);
    await this.lastNameInput.fill(userInfo.lastName);
    await this.postalCodeInput.fill(userInfo.postalCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async getMessage() {
    return await this.completePurchaseMessage.innerText();
  }

  async getCartItems() {
    return await this.cartItems.elementHandles();
  }
}
