import { Page } from "playwright";

export class LogInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async logIn(username, password) {
    const usernameInput = this.page.locator('[data-test="username"]');
    const passwordInput = this.page.locator('[data-test="password"]');
    const logInButton = this.page.locator('[data-test="login-button"]');

    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await logInButton.click();
  }

  async getErrorMessageClassAttribute() {
    const logInErrorMessage = this.page.locator(".error-message-container");

    return await logInErrorMessage.getAttribute("class");
  }
}

