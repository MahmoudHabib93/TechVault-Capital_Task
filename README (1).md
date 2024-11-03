
# Notes API Test Automation Project

This project is designed to automate testing for the Notes API, which includes features such as user registration, login, profile management, note creation, update, deletion, and password management.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Helper Functions](#helper-functions)
8. [Sample Tests](#sample-tests)
9. [Running Tests](#running-tests)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Overview

The project utilizes Playwright's testing framework to automate the testing of an API for managing notes. The test suite covers various API endpoints, including:
- **User Registration**
- **User Login**
- **Profile Management**
- **Password Change**
- **Note Creation, Update, and Deletion**

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [Playwright](https://playwright.dev/) testing framework

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/notes-api-automation.git
   cd notes-api-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright Browsers:**
   ```bash
   npx playwright install
   ```

## Configuration

The base URL and other configurations can be modified directly in the `apiHelper.ts` file or through environment variables if needed.

```typescript
const baseURL = 'https://practice.expandtesting.com/notes/api';
const authToken = '123456'; // Replace with a valid auth token
```

For sensitive data, you can set environment variables or use a `.env` file if supported by your setup.

## Project Structure

```plaintext
.
├── apiHelper.ts         # Contains helper functions to interact with the API
├── tests                # Directory containing all test files
│   ├── userTests.ts     # Test cases for user-related actions
│   ├── noteTests.ts     # Test cases for note-related actions
│   ├── authTests.ts     # Test cases for authentication
│   └── profileTests.ts  # Test cases for profile management
├── README.md            # Project documentation
└── package.json         # Project dependencies and scripts
```

## Usage

The project is organized to facilitate testing each API functionality separately. Here’s a brief description of the core helper functions and test scripts:

### Helper Functions

The helper functions in `apiHelper.ts` simplify the interaction with the Notes API.

- **`apiRequest`**: General function for making API requests with customizable methods, headers, and data.
- **`deleteNote`**: A specific function to delete a note by ID.
- **Other functions**: Includes login, register, change password, create note, update note, etc., with each function targeting a specific API endpoint.

### Sample Tests

Each test is designed to validate a specific endpoint. Here’s a summary:

1. **User Registration** - Registers a new user and verifies successful account creation.
2. **User Login** - Logs in a user and verifies profile information.
3. **Profile Update** - Updates the user profile and validates the updated details.
4. **Password Change** - Changes the user’s password and confirms successful update.
5. **Create Note** - Adds a new note and verifies it’s added successfully.
6. **Update Note** - Modifies an existing note and checks the changes.
7. **Delete Note** - Deletes a note by ID and verifies successful deletion.

## Running Tests

To run the tests, use the following command:

```bash
npx playwright test
```

To run a specific test file (e.g., userTests.ts):

```bash
npx playwright test tests/userTests.ts
```

## Example Test Code

Below is an example of a test case for user login:

```typescript
import { test, expect } from '@playwright/test';
import { apiRequest } from '../apiHelper';

test.describe('Notes API User Login', () => {
  const baseURL = 'https://practice.expandtesting.com/notes/api';
  const authToken = '123456';

  test('Log in with a user and verify profile information', async ({ request }) => {
    const loginData = {
      email: 'm@gmail.com',
      password: '1234'
    };

    const response = await apiRequest(request, 'POST', '/users/login', authToken, loginData);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.email).toBe(loginData.email);
    console.log('User logged in successfully:', responseBody);
  });
});
```

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and ensure the tests pass.
4. Submit a pull request with a detailed explanation of your changes.

## License

This project is licensed under the MIT License.
