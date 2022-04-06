import { Locator, Page } from "playwright";

export class HomePage {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async addToCart(item) {
    const addToCartButton = this.page.locator(
      `[data-test="add-to-cart-sauce-labs-${item}"]`
    );
    await addToCartButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
