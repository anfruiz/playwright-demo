import { test as base } from "@playwright/test";
import { Tu360Page } from "../src/pages/tu360Page";

const test = base.extend<{ tu360Page: Tu360Page }>({
  tu360Page: async ({ page }, use) => {
    const tu360Page = new Tu360Page(page);
    await tu360Page.goto();
    await tu360Page.loanSimulator();
    await use(tu360Page);
  },
});

test("Credit simulator form", async ({ tu360Page }) => {
  await tu360Page.creditSimulator();
  const buttonLabel = await tu360Page.simulatorButton();
  test.expect(buttonLabel).toBe("SOLICITAR CRÉDITO");
});

test("Leasing simulator form", async ({ tu360Page }) => {
    await tu360Page.leasingSimulator();
    const buttonLabel = await tu360Page.simulatorButton();
    test.expect(buttonLabel).toBe("SOLICITAR LEASING");
  });
