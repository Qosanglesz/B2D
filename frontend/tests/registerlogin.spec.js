// tests/registerlogin.spec.js

import { test, expect } from '@playwright/test';
import { testEnv } from './config.js';


// Function to generate a valid password
function generatePassword() {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    // Choose at least 3 character types
    const passwordArray = [
        lower[Math.floor(Math.random() * lower.length)],
        upper[Math.floor(Math.random() * upper.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        special[Math.floor(Math.random() * special.length)],
    ];
    
    // Fill the rest of the password with random characters from all types
    const allCharacters = lower + upper + numbers + special;
    for (let i = 4; i < 8; i++) { // Add remaining characters to reach at least 8
        passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    // Shuffle the password array to mix character types
    const password = passwordArray.sort(() => Math.random() - 0.5).join('');
    return password;
}


// Test Case ID: TC_01_01
test('Register with valid details', async ({ page }) => {
    // Step 1: Generate a unique email
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    // Generate a valid password
    const password = generatePassword();

    console.log(`Generated Email: ${uniqueEmail}`);
    console.log(`Generated Password: ${password}`);

    // Step 2: Navigate to the home page
    await page.goto(`${testEnv.HOST}`);

    // Wait for redirection to /home if user starts at /
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 3: Click the "Sign in" link
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Wait for the login page to load
    await page.waitForTimeout(1000);

    // Step 4: Verify that we are on the Auth0 login page
    // console.log('Current URL before waiting for login:', page.url());
    console.log('Current URL before waiting for login...');
    await page.waitForURL(/\/u\/login/, { timeout: 10000 }); // Partial match for login URL

    // Step 5: Click the "Sign up" link
    console.log('Navigating to Sign Up page...');
    await page.locator('a[href*="/u/signup"]').click();

    // Wait for the signup page to load
    await page.waitForTimeout(1000);

    // Step 6: Verify that we are on the Auth0 sign-up page
    // console.log('Current URL before waiting for sign-up:', page.url());
    console.log('Current URL before waiting for sign-up...');
    await page.waitForURL(/\/u\/signup/, { timeout: 10000 }); // Partial match for sign-up URL

    // Step 7: Ensure email input is visible and fill it
    const emailInput = page.locator('#email');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the email input to be visible
    await emailInput.click(); // Click to focus
    await emailInput.fill(uniqueEmail); // Fill email input with the unique email

    // Step 8: Ensure password input is visible and fill it
    const passwordInput = page.locator('#password');
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the password input to be visible
    await passwordInput.click(); // Click to focus
    await passwordInput.fill(password); // Fill password input with the generated password

    // Step 9: Click the "Continue" button
    await page.click('button:has-text("Continue")');

    // Step 10: Verify that we are redirected to the consent page
    // console.log('Current URL before waiting for consent:', page.url());
    console.log('Current URL before waiting for consent...');
    await page.waitForURL(/\/u\/consent/, { timeout: 10000 }); // Partial match for consent URL

    // Step 11: Click the "Accept" button for authorization
    await page.click('button:has-text("Accept")');

    // Step 12: Verify that the user is redirected back to /home
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 13: Check that the "Logout" link is now present
    const logoutLink = await page.locator('text=Logout');
    await expect(logoutLink).toBeVisible();
});


// Test Case ID: TC_01_02
test('Register with duplicate email', async ({ page }) => {
    // Step 1: Navigate to the home page
    await page.goto(`${testEnv.HOST}`);

    // Wait for redirection to /home if user starts at /
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 2: Click the "Sign in" link
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Wait for the login page to load
    await page.waitForTimeout(1000);

    // Step 3: Click the "Sign up" link
    console.log('Navigating to Sign Up page...');
    await page.locator('a[href*="/u/signup"]').click();

    // Wait for the signup page to load
    await page.waitForTimeout(1000);

    // Step 4: Ensure email input is visible and fill it with the duplicate email
    const emailInput = page.locator('#email');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.click();
    await emailInput.fill(testEnv.EMAIL); // Use the email from config.js (which should be already registered)

    // Step 5: Ensure password input is visible and fill it with a valid password
    const passwordInput = page.locator('#password');
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.click();
    await passwordInput.fill("ValidPassword123!"); // Use a placeholder or a valid password

    // Step 6: Click the "Continue" button
    await page.click('button:has-text("Continue")');

    // Step 7: Wait for the error message to be visible
    const errorMessage = page.locator('p.cce607bb6.c2c8605a6'); // Adjust the class name if needed
    await errorMessage.waitFor({ state: 'visible', timeout: 10000 });

    // Step 8: Verify that the error message is displayed
    await expect(errorMessage).toHaveText("Something went wrong, please try again later");
});
 

// Test Case ID: TC_01_03
test('Login with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the home page
    await page.goto(`${testEnv.HOST}`);

    // Step 2: Wait for redirection to /home if user starts at /
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 3: Click the "Sign in" link
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Wait for the login page to load
    await page.waitForTimeout(1000);

    // Step 4: Verify that we are on the Auth0 login page
    console.log('Current URL before waiting for login...');
    await page.waitForURL(/\/u\/login/, { timeout: 10000 }); // Partial match for login URL

    // Step 5: Ensure email input is visible and fill it
    // const emailInput = page.locator('#email'); // Login page use username as ID instead of email
    const emailInput = page.locator('#username');
    await emailInput.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the email input to be visible
    await emailInput.click();
    
    // Using email from config (which should be valid)
    await emailInput.fill(testEnv.EMAIL);

    // Step 6: Ensure password input is visible and fill it
    const passwordInput = page.locator('#password');
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the password input to be visible
    await passwordInput.click();
    
    // Using password from config (which should be valid)
    await passwordInput.fill(testEnv.PASSWORD); 

    // Step 7: Click the "Continue" button
    await page.click('button:has-text("Continue")');

    // Step 8: Verify user is redirected to the home page
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 9: Check for the presence of the "Logout" link
    const logoutLink = await page.locator('text=Logout');
    await expect(logoutLink).toBeVisible();
});


// Test Case ID: TC_01_04
test('Login with invalid username', async ({ page }) => {
    // Step 1: Navigate to the home page
    await page.goto(`${testEnv.HOST}`);

    // Step 2: Wait for redirection to /home if user starts at /
    await page.waitForURL(`${testEnv.HOST}/home`);

    // Step 3: Click the "Sign in" link
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Wait for the login page to load
    await page.waitForTimeout(1000);

    // Step 4: Verify that we are on the Auth0 login page
    console.log('Current URL before waiting for login...');
    await page.waitForURL(/\/u\/login/, { timeout: 10000 }); // Partial match for login URL

    // Step 5: Enter an invalid email (username) and valid password
    const emailInput = page.locator('#username'); // Ensure the correct ID
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.click();

    // Invalid email
    await emailInput.fill('สวัสดีครับพ่อแม่พี่น้อง กระผมมีนามว่าอินวาลิ่ดอีเมล');

    const passwordInput = page.locator('#password'); // Ensure the correct ID
    await passwordInput.fill('ValidPassword123'); // Replace with a valid password

    // Step 6: Click the "Continue" button
    await page.click('button:has-text("Continue")');

    // Step 7: Verify that an error message is displayed
    const errorMessage = page.locator('#error-element-password'); // Adjust selector based on your app's HTML
    await expect(errorMessage).toBeVisible();

    // Step 8: Verify that the error message is displayed correctly (trimmed)
    await expect(errorMessage).toHaveText(/Wrong email or password/i); // Use regex to match text, ignoring leading/trailing whitespace
});
