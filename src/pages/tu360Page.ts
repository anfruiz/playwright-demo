import type { Page } from "playwright";

export class Tu360Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://tu360.grupobancolombia.com/movilidad/home");
  }

  async searchCar() {
    await this.page.click("text=BUSCAR CARRO");
    await this.page.waitForSelector(".bc-home-search");
  }

  async loanSimulator() {
    await this.page.click("text=SIMULAR FINANCIACIÓN");
    await this.page.waitForSelector(".finance-simulador");
  }

  async creditSimulator() {
    await this.page.click("text=CRÉDITO");
  }

  async leasingSimulator() {
    await this.page.click("text=LEASING");
  }

  async simulatorButton() {
    return await this.page.innerText(
      "button.button-primary.button-call-to-action-simulator"
    );
  }

  async searchButton() {
    return await this.page.isVisible("text=BUSCAR");
    //return await this.page.innerText("h1");
  }
}
