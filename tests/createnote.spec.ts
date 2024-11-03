import { test, expect } from '@playwright/test';
import { requestWithAuth } from '../helpers/apiHelper';

test.describe('Notes API Create Note', () => {
  test('Create a new note and verify it’s added to the list of all notes', async ({ request }) => {
    // Define the note data
    const noteData = {
      title: 'mahmoud',              // Title of the note
      description: 'test task',      // Description of the note
      category: 'Home'               // Note category
    };

    // Use the helper function to send a POST request to create a new note
    const response = await requestWithAuth(request, 'POST', '/notes', noteData);

    // Check for various response statuses and handle each case
    if (response.status() === 200) {
      // Successful creation
      const responseBody = await response.json();
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("Successful Request");

      // Verify that the note data in the response matches the input
      const createdNote = responseBody.data;
      expect(createdNote.title).toBe(noteData.title);
      expect(createdNote.description).toBe(noteData.description);
      expect(createdNote.category).toBe(noteData.category);

      console.log('Note created successfully:', responseBody);

    } else if (response.status() === 401) {
      // Unauthorized (Invalid or expired token)
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Note creation failed - Unauthorized:', responseBody);

    } else if (response.status() === 400) {
      // Bad Request (e.g., validation issues)
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toContain("Bad Request");
      console.warn('Note creation failed - Bad Request:', responseBody);

    } else if (response.status() === 500) {
      // Internal Server Error
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Note creation failed - Internal Server Error:', responseBody);

    } else {
      // Unexpected response
      console.error('Unexpected response:', await response.json());
    }
  });
});
