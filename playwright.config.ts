import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.spec.ts",
  /*reporter: [["json", { outputFile: "results.json" }]],*/
  reporter: [["list"], ["junit", { outputFile: "reports/results.xml" }]],
  timeout: 60000,
  retries: 1,
  use: {
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
  /*projects: [
    {
      name: 'Chrome_Stable',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'Desktop_Safari',
      use: {
        browserName: 'webkit',
        viewport: { width: 1200, height: 750 },
      }
    },
    {
      name: 'Mobile_Chrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile_Safari',
      use: devices['iPhone 12'],
    },
    {
      name: 'Desktop_Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 800, height: 600 },
      }
    },
  ],*/
};
export default config;
