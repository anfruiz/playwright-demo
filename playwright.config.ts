import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup.ts"),
  testMatch: "*.spec.ts",
  reporter: [
    ["list"],
    ["junit", { outputFile: "reports/results.xml" }],
    ["allure-playwright"],
  ],
  timeout: 600000,
  retries: 1,
  grep: new RegExp("@POM"),
  use: {
    baseURL: "https://www.saucedemo.com",
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
};
export default config;
