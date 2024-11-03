import { test, expect } from '@playwright/test';


test.describe('Notes API User Login', () => {
    let userId: string;
  const authToken = '123456';
  let noteId: string;

  const baseURL = 'https://practice.expandtesting.com/notes/api';

  test('Log in with a user and verify profile information', async ({ request }) => {
    // Define login credentials
    const loginData = {
      email: 'm@gmail.com',
      password: '1234'
    };

    // Send a POST request to log in the user
    const response = await request.post(`${baseURL}/users/login`, {
      data: loginData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Check for various response statuses and handle each case
    if (response.status() === 200) {
      // Login successful
      const responseBody = await response.json();
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("Login successful");

      // Verify profile information in response
      const userData = responseBody.data;
      expect(userData.email).toBe(loginData.email);
      expect(userData.name).toBe("mahmoud"); // Replace with the actual expected name if known
      expect(userData).toHaveProperty("token"); // Verify token is present

      console.log('User logged in successfully:', responseBody);

    } else if (response.status() === 401) {
      // Incorrect email or password
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Incorrect email address or password");
      console.warn('Login failed - Incorrect email or password:', responseBody);

    } else if (response.status() === 400) {
      // Bad Request
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toBe("A valid email address is required");
      console.warn('Login failed - Bad Request:', responseBody);

    } else if (response.status() === 500) {
      // Internal Server Error
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Login failed - Internal Server Error:', responseBody);

    } else {
      // Unexpected response
      console.error('Unexpected response:', await response.json());
    }
  });
});
