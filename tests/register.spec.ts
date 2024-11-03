import { test, expect } from '@playwright/test';

test.describe('Notes API User Registration', () => {
    const baseURL = 'https://practice.expandtesting.com/notes/api';
    test('Register a new user and handle response', async ({ request }) => {
        // Define new user data
        const newUser = {
          name: 'mahmoud',
          email: 'm@gmail.com',
          password: '1234'
        };
    
        // Send a POST request to register the new user
        const response = await request.post(`${baseURL}/users/register`, {
          data: newUser,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
    
        // Check for various response statuses and handle each case
        if (response.status() === 201) {
          // User created successfully
          const responseBody = await response.json();
          expect(responseBody.success).toBe(true);
          expect(responseBody.status).toBe(201);
          expect(responseBody.message).toBe("User account created successfully");
    
          // Log user data
          const userData = responseBody.data;
          expect(userData.name).toBe(newUser.name);
          expect(userData.email).toBe(newUser.email);
          console.log('User created successfully:', responseBody);
    
        } else if (response.status() === 409) {
          // User already exists
          const responseBody = await response.json();
          expect(responseBody.success).toBe(false);
          expect(responseBody.status).toBe(409);
          expect(responseBody.message).toBe("An account already exists with the same email address");
          console.warn('User registration failed - User already exists:', responseBody);
    
        // } else if (response.status() === 400) {
        //   // Invalid input data
        //   const responseBody = await response.json();
        //   expect(responseBody.success).toBe(false);
        //   expect(responseBody.status).toBe(400);
        //   expect(responseBody.message).toBe("Invalid input data");
        //   console.warn('User registration failed - Invalid input data:', responseBody);
    
        } else {
          // Unexpected response
          console.error('Unexpected response:', await response.json());
        }
      });
    
});
