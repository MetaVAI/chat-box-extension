# Plan of Actions: Gemini Chrome Extension Chatbot

This document outlines the steps to build a Chrome extension that acts as a chatbot for any website, using the Gemini API to analyze page content.

## 1. Project Scaffolding

- Create the following directory structure and files:
  ```
  /chat-box
  |-- manifest.json
  |-- popup.html
  |-- popup.js
  |-- style.css
  |-- content.js
  |-- background.js
  |-- .env.example
  |-- README.md
  ```

## 2. `manifest.json`

- Create the manifest file with the following properties:
  - `manifest_version`: 3
  - `name`: "Gemini Chatbot"
  - `version`: "1.0"
  - `description`: "A chatbot that answers questions about the current page."
  - `permissions`: `["activeTab", "scripting", "storage"]`
  - `host_permissions`: `["<all_urls>"]`
  - `action`: `{ "default_popup": "popup.html" }`
  - `background`: `{ "service_worker": "background.js" }`

## 3. `popup.html`

- Create the HTML structure for the popup with:
  - A container for the chat messages.
  - A text area for user input.
  - A button to send the message.

## 4. `style.css`

- Add basic styling to the popup to make it look like a chat interface.

## 5. `content.js`

- This script will be injected into the active tab to extract the page's text content.
- It will get the `innerText` of the `document.body`.
- It will send the extracted text to the `background.js` script.

## 6. `background.js`

- This script will run in the background and manage communication between the content script and the popup.
- It will listen for messages from the content script containing the page content.
- It will store the content and forward it to the popup when requested.
- It will handle the API call to the Gemini API.

## 7. `popup.js`

- This script will handle the popup's logic:
  - Get the user's question from the text area.
  - Send a message to the background script to get the page content.
  - Receive the content and the user's question.
  - Make a `fetch` call to the Gemini API with the content and question.
  - Display the response in the chat container.
  - Manage the chat history.

## 8. `.env.example`

- Create an example environment file to show where to store the Gemini API key.

## 9. `README.md`

- Create a README file with instructions on how to install and use the extension.

## 10. Testing

- Manually test the extension by:
  - Loading it into Chrome.
  - Opening a web page.
  - Opening the popup and asking a question.
  - Verifying that the response is displayed correctly.
- Create a simple test to ensure the extension loads correctly.

## 11. Production-Ready Code

- Write clean, commented, and well-structured code.
- Include error handling for the API calls.
- Use a separate file for the API key to avoid hardcoding it.
