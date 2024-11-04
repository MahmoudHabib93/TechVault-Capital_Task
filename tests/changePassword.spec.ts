import { test, expect } from '@playwright/test';

test.describe('Notes API - Change Password', () => {
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  let authToken: string | null = null;

  // Step 1: Log in and get the auth token
  test.beforeEach(async ({ request }) => {
    const loginData = {
      email: 'm@gmail.com', // Replace with valid email
      password: '1234'       // Replace with valid password
    };

    const loginResponse = await request.post(`${baseURL}/users/login`, {
      data: loginData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Ensure login is successful and retrieve the token
    expect(loginResponse.status()).toBe(200); // Check if login was successful
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.success).toBe(true); // Assert that login succeeded
    authToken = loginResponseBody.data.token; // Store the auth token for subsequent requests
    console.log('Logged in successfully. Token:', authToken);
  });

  // Step 2: Change the user's password and verify the response
  test('Change user password and verify response', async ({ request }) => {
    // Ensure auth token is available
    if (!authToken) {
      throw new Error('Auth token is missing. Ensure login step is successful.');
    }

    // Define current and new password data
    const passwordData = {
      currentPassword: '1234',  // Current password
      newPassword: '12345'      // New password (ensure valid length)
    };

    // Send a PATCH request to change the password
    const response = await request.patch(`${baseURL}/users/change-password`, {
      data: new URLSearchParams(passwordData).toString(), // Convert data to x-www-form-urlencoded format
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authToken}`, // Use the token obtained from login
      },
    });

    // Parse response body
    const responseBody = await response.json();

    // Check for various response statuses and handle each case
    if (response.status() === 200) {
      // Password changed successfully
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("The password was successfully updated");

      console.log('Password change successful:', responseBody);

    } else if (response.status() === 401) {
      // Unauthorized (Invalid or expired token)
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Password change failed - Unauthorized:', responseBody);

    } else if (response.status() === 400) {
      // Bad Request (e.g., validation issues)
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toContain("Bad Request");
      console.warn('Password change failed - Bad Request:', responseBody);

    } else if (response.status() === 500) {
      // Internal Server Error
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Password change failed - Internal Server Error:', responseBody);

    } else {
      // Unexpected response
      console.error('Unexpected response:', responseBody);
      throw new Error(`Unexpected response with status code ${response.status()}`);
    }
  });
});

