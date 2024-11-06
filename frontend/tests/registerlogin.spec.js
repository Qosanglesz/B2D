// tests/registerlogin.spec.js

import { test, expect } from '@playwright/test';
import { testEnv } from './config.js';
import { generatePassword } from './helpers/generatePassword.js';


test.use({
    locale: 'en'
});


// Test Case ID: TC_01_01
test('Register with valid details', async ({ page }) => {

    // Step 1: Generate a unique email
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    // Generate a valid password
    const password = generatePassword();

    console.log(`Generated Email: ${uniqueEmail}`);
    console.log(`Generated Password: ${password}`);

    // Step 2: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);
    
    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 3: Check if user is at the Login page and change to Sign up
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('link', { name: 'Sign up' }).click();
    // After clicking 'Sign up' there should be an option to go back to 'Log in'
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();

    // Step 4: Register by filling in valid credentials
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill(uniqueEmail);

    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(password);

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 5: Confirm necessary authorizations and permissions
    // Check the terms and conditions agreement, then click 'Continue' to proceed
    await expect(page.getByText('By creating an account on')).toBeVisible();
    await expect(page.getByLabel('By creating an account on')).toBeVisible();
    await page.getByLabel('By creating an account on').check();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify app authorization prompt, then accept to complete registration
    await expect(page.getByRole('heading', { name: 'Authorize App' })).toBeVisible();
    await expect(page.getByText('B2DVenture is requesting')).toBeVisible();
    await page.getByRole('button', { name: 'Accept' }).click();

    // Step 6: The user should be at /home with the new 'Logout' button
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});


// Test Case ID: TC_01_02
test('Register with duplicate email', async ({ page }) => {

    // Step 1: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);
    
    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 2: Check if user is at the Login page and change to Sign up
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('link', { name: 'Sign up' }).click();
    // After clicking 'Sign up' there should be an option to go back to 'Log in'
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();

    // Step 3: Try to register with email that has been registered
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill(testEnv.EMAIL);

    // Password doesn't really matter in this case
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('!ValidPassword1234');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: Check for alert/error message since step 3 is impossible
    await expect(page.locator('#prompt-alert')).toBeVisible();
    await expect(page.getByText('Something went wrong, please')).toBeVisible();
});
 

// Test Case ID: TC_01_03
test('Login with valid credentials', async ({ page }) => {

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
});


// Test Case ID: TC_01_04
test('Login with invalid username', async ({ page }) => {

    // Step 1: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);

    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 2: Check if you are on Login page
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    // Step 3: Fill in an invalid email/username
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('อินวาลิ่ด อีเมล');

    // Password doesn't really matter in this case
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('!ValidPassword1234');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: After trying to continue you should be warned with error
    await expect(page.locator('#error-element-password').getByLabel('Error')).toBeVisible();
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});


// Test Case ID: TC_01_05
test('Login with invalid password', async ({ page }) => {

    // Step 1: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);

    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 2: Check if you are on Login page
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();

    // Step 3: Fill in an existing email but wrong password
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill(testEnv);

    // Password doesn't really matter in this case
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('happy');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: After trying to continue you should be warned with error
    await expect(page.locator('#error-element-password').getByLabel('Error')).toBeVisible();
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});


// Test Case ID: TC_01_06
test('Register with missing required fields', async ({ page }) => {

    // Step 1: Navigate to the home page and then sign in page
    await page.goto(`${testEnv.HOST}`);
    
    // Click the Sign in Button on Navbar
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Step 2: Check if user is at the Login page and change to Sign up
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('link', { name: 'Sign up' }).click();
    // After clicking 'Sign up' there should be an option to go back to 'Log in'
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();

    // Step 3: Clicking 'Continue' with out filling any fields
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: Nothing happens, we stayed at the same page
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});
