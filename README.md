# Gemini Chatbot Chrome Extension

## Overview

This Chrome extension integrates a chatbot directly into your browsing experience, designed to provide contextual answers and insights based on the content of the currently viewed web page. It leverages the Gemini API for intelligent responses and utilizes a content extraction library to focus on relevant information.

## Features

- **Contextual Chat:** Interact with a chatbot that understands and responds based on the active web page's content.
- **Content Extraction:** Utilizes a robust Readability library to intelligently extract primary content from web pages, ensuring the chatbot focuses on meaningful text.
- **User Interface:** Provides a clean and intuitive popup interface for chat interactions and an options page for configuration.

## Installation

To install this extension:

1.  Download or clone this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** by toggling the switch in the top right corner.
4.  Click on **Load unpacked** and select the directory where you cloned/downloaded this extension.
5.  The Gemini Chatbot extension icon should now appear in your browser toolbar.

## Usage

1.  Navigate to any web page.
2.  Click on the Gemini Chatbot extension icon in your Chrome toolbar.
3.  click on the three dots on the extension and enter you free gemini api key.
4.  Type your question into the chat input field within the popup.
5.  Receive contextual answers from the chatbot.

## Project Structure

- `manifest.json`: The core manifest file defining the extension's metadata, permissions, and entry points.
- `background.js`: Handles background processes, event listeners, and inter-component communication within the extension. Likely manages API calls to the Gemini service.
- `content.js`: Injected into active web pages to extract content and facilitate communication between the web page and the extension's background script.
- `popup.html`: The HTML structure for the extension's interactive popup window.
- `popup.js`: Manages the logic and user interactions within the popup, sending user queries and displaying chatbot responses.
- `options.html`: The HTML page for configuring extension settings and preferences.
- `options.js`: Handles the logic for saving and loading user-defined options.
- `Readability.js`: A third-party library (likely a modified version) used for extracting clean, readable content from HTML documents.
- `style.css`: Provides styling for the extension's user interface elements.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `plan_of_actions.md`: Internal document outlining development plans, tasks, or notes.

## Development

### Prerequisites

- Node.js (for potential build tools or dependency management, if applicable)
- Google Chrome browser

### Getting Started

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd chat-box
    ```
2.  Load the extension in Chrome as described in the [Installation](#installation) section.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Specify your license here, e.g., MIT, Apache 2.0, etc.]
