// tests/helpers/login.js

import { testEnv } from '../config';
import { expect } from '@playwright/test';


export async function login(page) {
    // Step 1: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);

    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 2: Check if you are on Login page
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    // Step 3: Fill in an existing account's Email and Password
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill(testEnv.EMAIL);
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(testEnv.PASSWORD);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: After continue you should be directed to /home with new 'Logout' button
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
}
