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


// Test Case ID: TC_09_01
test('View user information', async ({ page }) => {

    // Step 1: Log in using the helper function
    // make sure to put admin account in config.js
    await login(page);
  
    // Step 2: Goto /admin with url
    await page.goto(`${testEnv.ADMIN}`);

    // Step 3: Click 'User Management' on Admin Navbar
    await page.getByRole('link', { name: 'User Management' }).click();
    // Check if we're on the right page
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
    // Click on the first button
    await page.locator('button:has-text("View")').first().click();  
    // Check for some elements that are in the user detail page
    await expect(page.getByText('User ID:')).toBeVisible();
    await expect(page.getByText('Email:')).toBeVisible();
    await expect(page.getByText('Email Verified:')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to User Management' })).toBeVisible();
});


// Test Case ID: TC_10_01
test('View fundraising statements', async ({ page }) => {

    // Step 1: Log in using the helper function
    // make sure to put admin account in config.js
    await login(page);
  
    // Step 2: Goto /admin with url
    await page.goto(`${testEnv.ADMIN}`);

    // Step 3: Click 'Statement' on Admin Navbar
    await page.getByRole('link', { name: 'Statement' }).click();
    // Check if we're on the right page
    await expect(page.getByRole('heading', { name: 'All Statements' })).toBeVisible();
    // Check for some elements that are in the statement page
    await expect(page.getByRole('cell', { name: 'User Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'User Email' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Campaign Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Amount' })).toBeVisible();
});
