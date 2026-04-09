import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalTeardown: require.resolve('./global-teardown'),
  use: {
    // if running the app on dev env, change port to FE port (3000) instead
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /*Start db and BE (that serves FE) before running tests */
  webServer: [
    {
      command: 'bash scripts/setup-db.sh --env=test && NODE_ENV=test npm run start',
      url: 'http://localhost:3001',
      timeout: 60 * 1000,
      reuseExistingServer: !process.env.CI,
      cwd: '..',
    }
  ],
});
