// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 10000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3050',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx serve out -p 3050 -L',
    port: 3050,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
  projects: [
    {
      name: 'unit',
      testMatch: /tests\/[^/]+\.spec\.js$/,
      use: { browserName: 'chromium' },
    },
    {
      name: 'integration',
      testDir: './tests/integration',
      testMatch: /\.spec\.js$/,
      timeout: 30000,
      retries: 2,
      use: { browserName: 'chromium' },
    },
    {
      name: 'security',
      testDir: './tests/security',
      testMatch: /\.spec\.js$/,
      timeout: 30000,
      retries: 1,
      use: { browserName: 'chromium' },
    },
    {
      name: 'visual',
      testDir: './tests/visual',
      testMatch: /\.spec\.js$/,
      timeout: 15000,
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
