import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // if running the app on dev env, change port to FE port (3000) instead
    baseURL: process.env.BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run server in test env before starting the tests */
  webServer: [
    {
      command: 'NODE_ENV=test npm run start',
      url: 'http://localhost:3001',
      timeout: 60 * 1000,
      reuseExistingServer: !process.env.CI,
      cwd: '..',
    }
  ],
});
