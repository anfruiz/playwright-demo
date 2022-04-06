import { Locator, Page } from "playwright";

export class LogInPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly logInErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.logInButton = page.locator('[data-test="login-button"]');
    this.logInErrorMessage = page.locator('.error-message-container');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async logIn(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.logInButton.click();
  }

  async getErrorMessageClassAttribute() {
    return await this.logInErrorMessage.getAttribute("class");
  }
}

