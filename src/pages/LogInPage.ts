import { Page } from "playwright";

export class LogInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }

  async logIn(username, password) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

  async getErrorMessageClassAttribute() {
    return await this.page.getAttribute(".error-message-container", "class");
  }
}
