// tests/viewsearchfundraisingcampaigns.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';

// Test Case ID: TC_02_01
test('View all fundraising campaigns', async ({ page }) => {
    
    // Step 1: Log in using the helper function
    await login(page);
  
    // Step 2: Navigate to the fundraising campaigns page
    const url = `${testEnv.HOST}/campaign`;
    console.log(`Navigating to: ${url}`);
    await page.goto(url);
  
    // Step 3: Verify the page title is correct
    await expect(page.locator('h1')).toHaveText('Live Opportunities');
  
    // Step 4: Wait for the campaign cards to load
    await page.waitForSelector('.campaign-card', { timeout: 15000 }); // Adjust timeout as needed
    const campaignCards = page.locator('.campaign-card');
    
    // Ensure at least one campaign card is present
    const cardCount = await campaignCards.count();
    await expect(cardCount).toBeGreaterThan(0);
  
    // Step 5: Verify that all campaign cards are visible
    for (let i = 0; i < cardCount; i++) {
        const card = campaignCards.nth(i); // Get each individual card
        await expect(card).toBeVisible();   // Check visibility
    }
});
