import { Page } from "playwright";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(item) {
    await this.page.click(`[data-test="add-to-cart-sauce-labs-${item}"]`);
  }

  async goToCart() {
    await this.page.click(".shopping_cart_link");
  }
}
