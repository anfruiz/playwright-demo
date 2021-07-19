import { Page } from "playwright";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(item) {
    await this.page.click(`[data-test='remove-sauce-labs-${item}']`);
  }

  async completePurchase() {
    await this.page.click('[data-test="checkout"]');
    await this.page.fill('[data-test="firstName"]', "Fake");
    await this.page.fill('[data-test="lastName"]', "User");
    await this.page.fill('[data-test="postalCode"]', "00000");
    await this.page.click('[data-test="continue"]');
    await this.page.click('[data-test="finish"]');
  }

  async getMessage() {
    return await this.page.innerText(".complete-header");
  }

  async getCartItems() {
    return await this.page.$$(".cart_item");
  }
}
