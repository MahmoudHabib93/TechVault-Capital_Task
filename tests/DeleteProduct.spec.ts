import { test, expect } from '@playwright/test';

test('Delete a product and verify it is deleted successfully', async ({ page }) => {
  // Step 1: Navigate to the products page
  await page.goto('https://e-commerce-kib.netlify.app');

  // Step 2: Specify the product name to delete
  const targetProductName = 'iPhone 16 is for testing'; // Replace with the name of the product to delete

  // Step 3: Locate the product by name and click the delete icon/button
   // Ensure the product exists on the page

  await page.locator("div:nth-child(8) div:nth-child(4) div:nth-child(2) button:nth-child(2)").click(); // Click the delete icon; adjust .delete-icon as needed

  // Step 4: Confirm deletion (if there’s a confirmation dialog, uncomment the line below)
  // await page.click('button:has-text("Confirm")'); // Adjust selector for confirmation button if needed

  // Step 5: Verify that the product no longer exists on the page
  await expect(page.locator(`div:nth-child(11):has-text("${targetProductName}")`)).toBeHidden();

  console.log(`Product "${targetProductName}" deleted successfully.`);
});
