import { test, expect } from '@playwright/test';

test('Search for a product and verify the search results', async ({ page }) => {
  // Step 1: Navigate to the products page
  await page.goto('https://e-commerce-kib.netlify.app');

  // Step 2: Specify the product name to search for
  const searchQuery = '2024'; // Replace with the name of the product you want to search for

  // Step 3: Type the product name in the search bar and press Enter or wait for results to load
  await page.fill("input[placeholder='Search for products ...']", searchQuery); // Adjust selector to match your search input field
  await page.keyboard.press('Enter'); // Press Enter if necessary to trigger the search; remove if search auto-updates

  // Step 4: Verify that the search results contain the expected product
  const searchResult = page.locator(`.sc-jXbUNg.eZFFTp.flex.flex-col.p-4    :has-text("${searchQuery}")`); // Adjust .product-item to match each product in the results
  await expect(searchResult).toBeVisible(); // Ensure the product is visible in the search results

  console.log(`Product "${searchQuery}" found in search results.`);
});
