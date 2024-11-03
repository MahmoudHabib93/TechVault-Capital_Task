import { test, expect } from '@playwright/test';

test.describe('Notes API Health Check', () => {
  const baseURL = 'https://practice.expandtesting.com/notes/api';

  test('Verify that the API is healthy', async ({ request }) => {
    // Send a GET request to the health check endpoint
    const response = await request.get(`${baseURL}/health-check`);
    
    // Verify the response status code
    expect(response.status()).toBe(200);

    // Verify the response body
    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe("Notes API is Running");

    console.log('API Health Check: ', responseBody);
  });
});
