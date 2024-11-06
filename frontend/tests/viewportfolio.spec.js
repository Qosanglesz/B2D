// tests/ViewPortfolio.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';


test.use({
    locale: 'en'
});


// Test Case ID: TC_05_01 and TC_06_01
test('View current portfolio', async ({ page }) => {
    
    // Step 1: Log in using the helper function
    await login(page);

    // Step 2: Navigate to the fundraising campaigns page
    await page.goto(`${testEnv.PORTFOLIO}`);

    // Step 3: Verify the User Investment Portfolio heading is visible
    const userInvestmentPortfolioHeader = page.locator('h1.text-3xl.font-bold.my-4.mx-3');
    await expect(userInvestmentPortfolioHeader).toBeVisible();
    console.log('Checked visibility of User Investment Portfolio header.');

    // Step 4: Verify the Investment Statements subheading is visible
    const investmentStatementsHeader = page.locator('h2.text-2xl.font-semibold.my-4');
    await expect(investmentStatementsHeader).toBeVisible();
    console.log('Checked visibility of Investment Statements header.');
});
