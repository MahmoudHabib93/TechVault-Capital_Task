import { test, expect } from '@playwright/test';

test('Click on the “+” button and verify the counter is increased', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://flutter-angular.web.app/#/');

  // Step 2: Get the initial counter value
  const counter = page.locator('flutter-view').click(); // Adjust #counter if there's a different selector for the counter display
  const initialValue = parseInt(await counter.textContent(), 10);

  // Step 3: Click on the “+” button
  await page.click('button:has-text("+")'); // Adjust the selector if necessary

  // Step 4: Verify the counter has increased
  const newValue = parseInt(await counter.textContent(), 10);
  expect(newValue).toBe(initialValue + 1);

  console.log(`Counter increased from ${initialValue} to ${newValue}`);
});
