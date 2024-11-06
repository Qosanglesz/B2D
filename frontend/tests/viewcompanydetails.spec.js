// tests/ViewCompanyDetails.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';


test.use({
    locale: 'en'
});


// Test Case ID: TC_03_01
test('View company details', async ({ page }) => {
    
    // Step 1: Log in using the helper function
    await login(page);

    // Step 2: Navigate to the fundraising campaigns page
    await page.getByRole('link', { name: 'Campaigns' }).click();

    // Step 3: Check if you are on campaigns page
    await expect(page.getByRole('heading', { name: 'Live Opportunities' })).toBeVisible();
    await page.waitForSelector('.campaign-card', { timeout: 15000 }); // Wait for campaign cards

    // Step 4: Click on the first campaign card
    const firstCampaignCard = page.locator('.campaign-card').first(); // Select the first campaign card
    await expect(firstCampaignCard).toBeVisible(); // Ensure it's visible
    await firstCampaignCard.click(); // Click on the first campaign card

    // Step 5: Wait for the campaign details to load
    await page.waitForSelector('h2.text-5xl.font-bold.text-gray-900.mb-8'); // Wait for the company details header

    // Step 6: Verify the Company Details header is visible
    const companyDetailsHeader = page.locator('h2.text-5xl.font-bold.text-gray-900.mb-8');
    await expect(companyDetailsHeader).toBeVisible();
    console.log('Checked visibility of Company Details header.');

    // Step 7: Verify the Invest button is visible
    const investButton = page.locator('button.bg-blue-600.text-white.py-3.px-6.text-lg.rounded-lg.hover\\:bg-blue-500.transition-all.block.mx-auto.w-full');
    await expect(investButton).toBeVisible();
    console.log('Checked visibility of Invest button.');
});
