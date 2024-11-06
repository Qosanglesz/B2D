// tests/Investment.spec.js

import { test, expect } from '@playwright/test';
import { login } from './helpers/login';
import { testEnv } from './config';


test.use({
    locale: 'en'
});


// test('Invest with valid details', async ({ page }) => {

//     await login(page);
  
//     await page.getByRole('link', { name: 'Campaigns' }).click();

//     await page.getByRole('img', { name: 'Innovative Tech Ltd.' }).click();
//     await page.getByLabel('How much money do you want to').click();
//     await page.getByLabel('How much money do you want to').fill('02500');
//     await page.getByRole('button', { name: 'Invest in Innovative Tech Ltd.' }).click();
//     await page.getByRole('button', { name: 'Pay $2500.00 with Card' }).click();
//     await page.getByLabel('Email').click();
//     await page.getByLabel('Email').fill('manggy2546@gmail.com');
//     await page.getByPlaceholder('1234 1234 1234').click();
//     await page.getByPlaceholder('1234 1234 1234').fill('4242 4242 4242 4242');
//     await page.getByPlaceholder('MM / YY').click();
//     await page.getByPlaceholder('MM / YY').fill('06 / 26');
//     await page.getByPlaceholder('CVC').click();
//     await page.getByPlaceholder('CVC').fill('626');
//     await page.getByPlaceholder('Full name on card').click();
//     await page.getByPlaceholder('Full name on card').fill('Meng Lee');
//     await page.getByTestId('hosted-payment-submit-button').click();
//     await page.goto('http://localhost:3000/payment/success/b3741db9-d0be-4eca-a9e9-864e93f0cec5?provider=stripe');
// });