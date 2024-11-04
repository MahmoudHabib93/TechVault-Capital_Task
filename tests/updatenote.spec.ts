import { test, expect } from '@playwright/test';

test.describe('Notes API - Update Note', () => {
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  let authToken: string | null = null;
  const noteId = '642a08826a35ca02115ea350'; // Replace with a valid note ID

  // Step 1: Log in to get the auth token
  test.beforeEach(async ({ request }) => {
    const loginData = {
      email: 'm@gmail.com',
      password: '1234'
    };

    const loginResponse = await request.post(`${baseURL}/users/login`, {
      data: loginData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    // Ensure login is successful and retrieve the token
    expect(loginResponse.status()).toBe(200); // Check if login was successful
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.success).toBe(true); // Assert that login succeeded
    authToken = loginResponseBody.data.token; // Store the auth token for subsequent requests
    console.log('Logged in successfully. Token:', authToken);
  });

  // Step 2: Update a note and verify the update
  test('Update a note and verify it’s updated successfully', async ({ request }) => {
    // Define updated note data
    const updatedNoteData = {
      title: 'Personal note title',
      description: 'Personal note description',
      completed: 'true',
      category: 'Personal'
    };

    // Ensure the auth token is available
    if (!authToken) {
      throw new Error('Auth token is missing. Ensure login step is successful.');
    }

    // Send a PUT request to update the note
    const response = await request.put(`${baseURL}/notes/${noteId}`, {
      data: updatedNoteData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Use the token obtained from login
      },
    });

    // Parse the response
    const responseBody = await response.json();
    const status = response.status();

    // Handle and verify different response statuses
    if (status === 200) {
      // Success
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("Successful Request");

      // Verify the updated note data in the response
      const noteData = responseBody.data;
      expect(noteData.title).toBe(updatedNoteData.title);
      expect(noteData.description).toBe(updatedNoteData.description);
      expect(noteData.completed.toString()).toBe(updatedNoteData.completed);
      expect(noteData.category).toBe(updatedNoteData.category);

      console.log('Note updated successfully:', responseBody);

    } else if (status === 401) {
      // Unauthorized or Token issue
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Update failed - Unauthorized Request:', responseBody);

    } else if (status === 400) {
      // Bad Request
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toBe("Bad Request");
      console.warn('Update failed - Bad Request:', responseBody);

    } else if (status === 500) {
      // Internal Server Error
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Update failed - Internal Server Error:', responseBody);

    } else {
      // Unexpected response
      console.error(`Unexpected response (Status: ${status}):`, responseBody);
      throw new Error(`Unexpected response while updating note. Status: ${status}`);
    }
  });
});

