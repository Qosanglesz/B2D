// tests/AdminAccess.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';


test.use({
    locale: 'en'
});


// Test Case ID: TC_07_01
test('Admin login with valid credentials', async ({ page }) => {

    // Step 1: Log in using the helper function
    // make sure to put admin account in config.js
    await login(page);
  
    // Step 2: Goto /admin with url
    await page.goto(`${testEnv.ADMIN}`);

    // Step 3: Check for elements that are available only in /admin page
    await expect(page.getByRole('link', { name: 'B2D VENTURE ADMIN' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Fundraising' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'User Management' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Statement' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Crypto' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Form' })).toBeVisible();
});


// Test Case ID: TC_07_02
test('Attempt unauthorized access', async ({ page }) => {

    // Step 1: Log in using the helper function
    // make sure to put NON-admin account in config.js
    await login(page);
  
    // Step 2: Attempt to go /admin with url
    await page.goto(`${testEnv.ADMIN}`);

    // Step 3: Nothing happens, redirected to /home
    // Check for elements that are in /home page
    await expect(page.getByRole('heading', { name: 'Fundraising Campaigns' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View All' })).toBeVisible();
});