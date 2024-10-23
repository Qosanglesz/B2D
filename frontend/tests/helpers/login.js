// tests/helpers/login.js

import { testEnv } from '../config';


export async function login(page) {
  // Navigate to the home page
  await page.goto(`${testEnv.HOST}`);
  
  // Wait for redirection to /home if user starts at /
  await page.waitForURL(`${testEnv.HOST}/home`, { timeout: 10000 });

  // Click the "Sign in" link
  await page.getByRole('link', { name: 'Sign in' }).click();

  // Wait for the Auth0 login page to load
  await page.waitForURL(/\/u\/login/, { timeout: 10000 });

  // Fill in email/username
  const emailInput = page.locator('#username');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.click();
  await emailInput.fill(testEnv.EMAIL);

  // Fill in password
  const passwordInput = page.locator('#password');
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.click();
  await passwordInput.fill(testEnv.PASSWORD);

  // Click "Continue"
  await page.click('button:has-text("Continue")');

  // Wait for redirection to the home page after login
  await page.waitForURL(`${testEnv.HOST}/home`, { timeout: 10000 });
}
