import { Page } from "playwright";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(item) {
    const addToCartButton = this.page.locator(
      `[data-test="add-to-cart-sauce-labs-${item}"]`
    );

    await addToCartButton.click();
  }

  async goToCart() {
    const cartButton = this.page.locator(".shopping_cart_link");
    
    await cartButton.click();
  }
}
