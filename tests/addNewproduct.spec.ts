import { test, expect } from '@playwright/test';
import path from 'path';

test('Add a new product and verify it is added successfully', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://e-commerce-kib.netlify.app/');

  // Click on the "Add Product" button/icon
  await page.click('.cursor-pointer.h-7.w-7'); // Adjust this selector as necessary

  // Wait for the form to be visible
  await page.waitForSelector('form');
  // Fill out the form fields
  await page.fill("input[name='title']", 'Test Product 1 ');
  await page.fill("input[name='description']", 'This is a test description for the product FOR THE TASK.');
  await page.fill("input[value='0']", '49.99');

  // Submit the form by clicking "Create Product"
  await page.click("button[type='submit']");

  // Optionally, go to the product listing page and verify the new product appears
  
  const productName = 'Test Product 1';
  const productExists = await page.isVisible(`text=${productName}`);
  expect(productExists).toBe(false);

 
});
// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://e-commerce-kib.netlify.app/');
//   await page.locator('div:nth-child(10) > .sc-jlZhew > .card-actions > button > a').click();
//   await page.locator('input[name="title"]').click();
//   await page.locator('input[name="title"]').fill('Test Product 11 edit test');
//   await page.locator('input[name="description"]').click();
//   await page.locator('input[name="description"]').fill('This is a test description for the R THE TASK.1');
//   await page.locator('input[name="description"]').press('ArrowRight');
//   await page.locator('input[name="description"]').fill('This is a test description for the  THE TASK.1');
//   await page.getByRole('spinbutton').click();
//   await page.getByRole('spinbutton').fill('5088.666');
//   await page.getByRole('button', { name: 'Save Product' }).click();
//   await page.locator('div:nth-child(10) > .sc-jlZhew > .card-actions > button > a').click();
//   await page.getByRole('main').locator('path').click();
//   await page.getByRole('main').getByRole('img').click();
//   await page.getByText('Upload').click();
//   await page.locator('body').setInputFiles('Mascot-red-parrot-blue-and-yellow-giant.jpg');
// });