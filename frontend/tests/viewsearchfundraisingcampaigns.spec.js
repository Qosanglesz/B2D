// tests/ViewSearchFundraisingCampaigns.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';


test.use({
    locale: 'en'
});


// Test Case ID: TC_02_01
test('View all fundraising campaigns', async ({ page }) => {
    
    // Step 1: Log in using the helper function
    await login(page);
  
    // Step 2: Navigate to the fundraising campaigns page
    await page.getByRole('link', { name: 'Campaigns' }).click();

    // Step 3: Check if you are on campaigns page
    await expect(page.getByRole('heading', { name: 'Live Opportunities' })).toBeVisible();
    // this 'grid' should contain all campaign cards
    await expect(page.locator('.grid')).toBeVisible();
});


// Test Case ID: TC_02_03
test('Search campaigns with no matching results', async ({ page }) => {
    // Step 1: Log in using the helper function
    await login(page);
  
    // Step 2: Navigate to the fundraising campaigns page
    await page.getByRole('link', { name: 'Campaigns' }).click();

    // Step 3: Check if you are on campaigns page
    await expect(page.getByRole('heading', { name: 'Live Opportunities' })).toBeVisible();
    // this 'grid' should contain all campaign cards
    await expect(page.locator('.grid')).toBeVisible();

    // Step 4: Click on 'Search' and try to search for non-existing campaign
    await page.getByPlaceholder('Search..').click();
    await page.getByPlaceholder('Search..').fill('ข้าวมันไก่เตียงเกตุ');
    await expect(page.getByText('No campaigns found')).toBeVisible();
});