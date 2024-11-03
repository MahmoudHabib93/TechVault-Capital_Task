import { test, expect } from '@playwright/test';


test.describe('Notes API Change Password', () => {
    let userId: string;
    const authToken = '123456';
    let noteId: string;
  
    const baseURL = 'https://practice.expandtesting.com/notes/api';
  test('Change user password and verify response', async ({ request }) => {
    // Define current and new password data
    const passwordData = {
      currentPassword: '1234', // Current password
      newPassword: '12345'     // New password (use a valid length to avoid validation error)
    };

    // Use the helper function to send a POST request to change the password
    const response = await request.patch(`${baseURL}/users/change-password`, {
        
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Token': authToken // Include the auth token in headers
        }
      });

    // Check for various response statuses and handle each case
    if (response.status() === 200) {
      // Password changed successfully
      const responseBody = await response.json();
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("The password was successfully updated");

      console.log('Password change successful:', responseBody);

    } else if (response.status() === 401) {
      // Unauthorized (Invalid or expired token)
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Password change failed - Unauthorized:', responseBody);

    } else if (response.status() === 400) {
      // Bad Request (e.g., validation issues)
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(400);
      expect(responseBody.message).toContain("Bad Request");
      console.warn('Password change failed - Bad Request:', responseBody);

    } else if (response.status() === 500) {
      // Internal Server Error
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(500);
      expect(responseBody.message).toBe("Internal Error Server");
      console.error('Password change failed - Internal Server Error:', responseBody);

    } 
  });
});
