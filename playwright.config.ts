import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.spec.ts",
  /*reporter: [["json", { outputFile: "results.json" }]],*/
  reporter: [["list"], ["junit", { outputFile: "reports/results.xml" }]],
  timeout: 600000,
  retries: 1,
  use: {
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
};
export default config;
