# Amazon Creators API - Node.js Implementation

This project provides a Node.js implementation for testing Amazon Creators API credentials and retrieving book metadata. It demonstrates the OAuth 2.0 authentication flow required by the Creators API and includes scripts for searching books by keyword or ISBN.

## Features
* **OAuth 2.0 Authentication:** Full implementation of the flow required for the Amazon Creators API.
* **Keyword Search:** Search for books using specific keywords.
* **Constraint Handling:** Manages Amazon's resource constraints (e.g., `offersV2` vs `offers`).

## Prerequisites
Before running this project, ensure you have the following:

* **Node.js:** Version 14 or higher installed.
* **npm:** Comes with Node.js.
* **Amazon Associates Account:** Must be enrolled in the program.
* **Creators API Credentials:** You must generate these in [Associates Central](https://affiliate-program.amazon.com/) under the "Product Advertising API" section. You will need:
    * Credential ID
    * Credential Secret
    * Version (e.g., 2.1, 2.2, 2.3)
    * Partner Tag (Associate ID)

## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Configuration
This project uses a `.env` file to manage sensitive credentials securely.

1. Create a file named `.env` in the root of the project.
2. Add your Creators API credentials to the file in the following format:

```env
CREDENTIAL_ID=your_credential_id_here
CREDENTIAL_SECRET=your_credential_secret_here
VERSION=2.1
PARTNER_TAG=your_associate_tag_here
MARKETPLACE=www.amazon.com
REGION=us-west-2
```

### Important Configuration Notes
* **Credential Secret:** Ensure there are no trailing spaces or invisible characters in the `.env` file.
* **Region:** For Creators API version 2.1 (North America), the authentication region is typically `us-west-2`. If you are using a different version (2.2 for EU, 2.3 for FE), ensure the region matches the authentication endpoint requirements.
* **Do not commit:** Add `.env` to your `.gitignore` file to prevent committing secrets to GitHub.

## Usage

### Searching for Books
To run a general book search using keywords, use the `search-books.js` script.

```bash
node search-books.js
```
This script is pre-configured to search for "Harry Potter". You can modify the `payload` variable in `search-books.js` to change the search keywords or filters.

## Troubleshooting

### Error: `invalid_client`
This error indicates that the Credential ID is incorrect or does not exist for the region specified.
* Verify your `CREDENTIAL_ID` in `.env`.

### Error: `invalid_client_secret`
This error means the Credential Secret does not match the Credential ID in Amazon's records.
* Ensure you copied the full `CREDENTIAL_SECRET` string.
* Check for leading or trailing spaces in the `.env` file.
* **Note:** Secrets are only displayed once in Associates Central. You may need to generate new credentials if you lost the original secret.

## Project Structure
* `auth.js`: Handles OAuth 2.0 authentication and access token retrieval.
* `search-books.js`: Script to search books by keyword.
* `.env`: Configuration file (Do not commit).
* `package.json`: Project dependencies.

## License
This project is provided as-is for educational and development purposes. Please ensure your use of the Amazon Creators API complies with Amazon's Terms and Conditions.
