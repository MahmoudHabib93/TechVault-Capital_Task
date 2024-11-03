import { test, expect } from '@playwright/test';

test.describe('Notes API - Update Note', () => {
  const authToken = '123456'; // Use a valid token if available
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  let noteId = '642a08826a35ca02115ea350'; // Replace with actual note ID if dynamic

  test('Update a note and verify it’s updated successfully', async ({ request }) => {
    // Define updated note data
    const updatedNoteData = {
      title: 'Personal note title',
      description: 'Personal note description',
      completed: 'true',
      category: 'Personal'
    };

    // Send a PUT request to update the note
    const response = await request.put(`${baseURL}/notes/${noteId}`, {
      data: updatedNoteData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-Token': authToken // Include the auth token in headers
      }
    });

    // Handle and verify different response statuses
    if (response.status() === 200) {
      // Success
      const responseBody = await response.json();
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

    } else if (response.status() === 401) {
      // Unauthorized or Token issue
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Update failed - Unauthorized Request:', responseBody);

    } else if (response.status() === 400) {
      // Bad Request
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toBe("Bad Request");
      console.warn('Update failed - Bad Request:', responseBody);

    } else if (response.status() === 500) {
      // Internal Server Error
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Update failed - Internal Server Error:', responseBody);

    } else {
      // Unexpected response
      console.error('Unexpected response:', await response.json());
    }
  });
});
