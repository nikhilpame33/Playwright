// @ts-check
import { defineConfig } from '@playwright/test';
import { truncate } from 'node:fs';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  timeout:40*1000,
  expect:{
    timeout:7*1000,
  },
  reporter : "html",
  
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot:'on',
    trace:'retain-on-failure' }
});
module.exports = config
