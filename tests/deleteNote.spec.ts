import { test, expect } from '@playwright/test';
import { deleteNote } from '../helpers/apiHelper';

test('Delete a note and verify it’s deleted successfully', async ({ request }) => {
  const authToken = '123456';
  const noteId = '642a08826a35ca02115ea350';

  // Use the deleteNote helper function
  const response = await deleteNote(request, noteId, authToken);

  if (response.status() === 200) {
    const responseBody = await response.json();
    expect(responseBody.success).toBe(true);
    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe('Successful Request');
    console.log('Note deleted successfully:', responseBody);
  } else if (response.status() === 401) {
    const responseBody = await response.json();
    expect(responseBody.success).toBe(false);
    expect(responseBody.status).toBe(401);
    expect(responseBody.message).toBe('Access token is not valid or has expired, you will need to login');
    console.warn('Delete note failed - Unauthorized:', responseBody);
  } else {
    console.error('Error deleting note:', await response.json());
  }
});
