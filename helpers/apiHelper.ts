import { APIRequestContext } from '@playwright/test';

// General API request function for various methods
export async function apiRequest(
  request: APIRequestContext,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  authToken: string,
  data?: Record<string, any>
) {
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Auth-Token': authToken,
    'Accept': 'application/json'
  };

  const response = await request.fetch(`${baseURL}${endpoint}`, {
    method,
    headers,
    data,
  });

  return response;
}

// Specific function for deleting a note
export async function deleteNote(
  request: APIRequestContext,
  noteId: string,
  authToken: string
) {
  const endpoint = `/notes/${noteId}`;
  const response = await apiRequest(request, 'DELETE', endpoint, authToken);
  return response;
}
