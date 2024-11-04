import { test, expect } from '@playwright/test';
import { deleteNote } from '../helpers/apiHelper';

test.describe('Notes API - Delete Note with Auth', () => {
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  let authToken: string | null = null;

  test('Log in and delete a note', async ({ request }) => {
    // Step 1: Log in and get the token
    const loginData = {
      email: 'm@gmail.com',
      password: '1234'
    };

    const loginResponse = await request.post(`${baseURL}/users/login`, {
      data: loginData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check if login was successful and extract the token
    expect(loginResponse.status()).toBe(200); // Ensure login was successful
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.success).toBe(true); // Ensure success in the response
    authToken = loginResponseBody.data.token; // Extract the token
    console.log('Logged in successfully. Token:', authToken);

    // Step 2: Delete a note using the token
    const noteId = '642a08826a35ca02115ea350'; // Replace with a valid noteId
    const deleteResponse = await deleteNote(request, noteId, authToken);

    const status = deleteResponse.status();
    const deleteResponseBody = await deleteResponse.json();

    if (status === 200) {
      // Successfully deleted
      expect(deleteResponseBody.success).toBe(true);
      expect(deleteResponseBody.status).toBe(200);
      expect(deleteResponseBody.message).toBe('Successful Request');
      console.log('Note deleted successfully:', deleteResponseBody);
    } else if (status === 401) {
      // Unauthorized (token expired or invalid)
      expect(deleteResponseBody.success).toBe(false);
      expect(deleteResponseBody.status).toBe(401);
      expect(deleteResponseBody.message).toBe('Access token is not valid or has expired, you will need to login');
      console.warn('Delete note failed - Unauthorized:', deleteResponseBody);
    } else if (status === 404) {
      // Note not found
      expect(deleteResponseBody.success).toBe(false);
      expect(deleteResponseBody.status).toBe(404);
      expect(deleteResponseBody.message).toBe('Note not found');
      console.warn('Delete note failed - Note not found:', deleteResponseBody);
    } else {
      // Handle unexpected statuses
      console.error(`Error deleting note (Status: ${status}):`, deleteResponseBody);
      throw new Error(`Failed to delete note. Status: ${status}`);
    }
  });
});

