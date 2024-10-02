import { test, expect } from '@playwright/test';
import {testEnv} from "./config.js";
test.use({
    locale: 'en'
});

test('User login and view campaigns details', async ({ page }) => {
    await page.goto(testEnv.HOST);
    await page.getByRole('button', { name: 'Browse Startups' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByLabel('Email or phone').click();
    await page.getByLabel('Email or phone').fill(testEnv.GOOGLE_ID);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill(testEnv.Pass);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Browse Startups' }).click();
    await page.getByRole('link', { name: 'Tech Innovators Ltd.' }).first().click();
});

test('User login and reviews own portfolio', async ({ page }) => {
    await page.goto(testEnv.HOST);
    await page.getByRole('button', { name: 'Browse Startups' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByLabel('Email or phone').click();
    await page.getByLabel('Email or phone').fill(testEnv.GOOGLE_ID);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill(testEnv.Pass);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Browse Startups' }).click();
    await page.getByRole('link', { name: 'Portfolio' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
});

test('test', async ({ page }) => {
    await page.goto(testEnv.HOST);
    await page.getByRole('button', { name: 'Browse Startups' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByLabel('Email or phone').click();
    await page.getByLabel('Email or phone').fill(testEnv.GOOGLE_ID);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Enter your password').fill(testEnv.PASS);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.goto('http://localhost:3000/admin');
});