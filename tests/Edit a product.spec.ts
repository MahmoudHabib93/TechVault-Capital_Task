import { test, expect } from '@playwright/test';

test('Edit a product', async ({ page }) => {
  // Step 1: Open the website
  await page.goto('https://e-commerce-kib.netlify.app/');
 
  // Step 3: Ensure all products are displayed
  // Adjust selector based on actual HTML structure
  await page.waitForSelector('.infinite-scroll-component');

  // Step 4: Find and click on the edit icon for the desired product
  // Replace `nth(0)` with the index or unique selector for the product you need to edit
  await page.locator("a[href='/edit/test-product-1']").click();

  // Step 5: Edit product fields
  await page.fill("input[name='title']", 'Test Product mahmoud');
  await page.fill("input[name='description']", 'mahmoud task for edit product and for test it');
  await page.fill("input[value='0']", '6060.99');


  // Step 6: Click on the save button
  await page.click("button[type='submit']");

//   // Step 7: Verify that changes were saved
//   await page.waitForSelector('.success-message'); // Replace with the actual success message selector
//   const successMessage = await page.locator('.success-message').textContent();
//   expect(successMessage).toContain('Product updated successfully');

//   console.log('Product edited successfully');
});
