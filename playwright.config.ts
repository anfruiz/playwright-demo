import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.spec.ts",
  /*reporter: [["json", { outputFile: "results.json" }]],*/
  reporter: [['list'], ['junit', { outputFile: 'reports/results.xml' }] ],
  timeout: 60000,
  retries: 1,
  use: {
    // Browser options
    //headless: false,
    //slowMo: 50,

    // Context options
    //viewport: { width: 1280, height: 720 },
    //ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
};
export default config;
