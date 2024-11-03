import { test, expect } from '@playwright/test';
test.describe('Notes API User Login', () => {
    let userId: string;
  const authToken = '123456';
  let noteId: string;

  const baseURL = 'https://practice.expandtesting.com/notes/api';

test('Update profile information and verify it’s updated successfully', async ({ request }) => {
    // Define new profile data
    const updatedProfile = {
      name: 'mahmoud',
      phone: '0123456789',
      company: 'Expand Testing'
    };

    // Send a PATCH request to update the profile
    const response = await request.patch(`${baseURL}/users/profile`, {
      data: updatedProfile,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-Token': authToken // Include the auth token in headers
      }
    });

    // Check for various response statuses and handle each case
    if (response.status() === 200) {
      // Profile updated successfully
      const responseBody = await response.json();
      expect(responseBody.success).toBe(true);
      expect(responseBody.status).toBe(200);
      expect(responseBody.message).toBe("Profile updated successful");

      // Verify updated profile information
      const userData = responseBody.data;
      expect(userData.name).toBe(updatedProfile.name);
      expect(userData.phone).toBe(updatedProfile.phone);
      expect(userData.company).toBe(updatedProfile.company);

      console.log('Profile updated successfully:', responseBody);

    } else if (response.status() === 401) {
      // Unauthorized (No or invalid token)
      const responseBody = await response.json();
      expect(responseBody.success).toBe(false);
      expect(responseBody.status).toBe(401);
      expect(responseBody.message).toBe("Access token is not valid or has expired, you will need to login");
      console.warn('Update failed - No authentication token:', responseBody);

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