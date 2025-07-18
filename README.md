<p align="center">
  <img src="https://github.com/MetaVAI/chat-box-extension/blob/main/gemini_chatbot.jpg" alt="Gemini Chatbot Logo" />
</p>

<h1 align="center">🌐 Gemini Chatbot Chrome Extension</h1>

<p align="center">
  Bring AI directly into your browsing experience.<br />
  A Chrome extension that adds a smart, context-aware chatbot to any web page using Google’s Gemini API.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg" />
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
  <!-- will Uncomment and update when published -->
  <!-- <a href="https://chrome.google.com/webstore/detail/your-extension-id">
    <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/your-extension-id.svg?label=Chrome%20Web%20Store" />
  </a> -->
</p>

---

## 🚀 What Is It?

**Gemini Chatbot** is a lightweight yet powerful Chrome extension that allows you to chat with an AI that _understands the page you're on_. Whether you're reading an article, researching a topic, or just browsing, the chatbot provides intelligent, contextual responses in real time.

Powered by [Gemini API](https://ai.google.dev/), and built for developers, researchers, and everyday users alike.

---

## ✨ Features

- 💬 **Context-Aware Chat**  
  Ask questions and get answers _based on the content of the current web page_.

- 🧠 **Smart Content Extraction**  
  Uses a custom implementation of the Readability library to focus only on meaningful text (no ads, footers, or clutter).

- 🖼️ **Minimal, Intuitive UI**  
  Clean popup interface for chat. Simple options page for API key setup.

- 🛠️ **Privacy-First Design**  
  Content stays on your browser—only your prompts and extracted text are sent to Gemini.

---

## 🧩 Installation

1. **Clone or download** this repository:

   ```bash
   git clone <repository-url>
   cd gemini-chatbot-extension

   ```

2. Open Chrome and go to chrome://extensions.

3. Enable Developer Mode (top-right toggle).

4. Click Load Unpacked and select the folder where you cloned the extension.

5. You’ll now see the Gemini Chatbot icon in your Chrome toolbar 🎉

## 💡 How to Use

1. Open any web page.

2. Click the Gemini Chatbot icon in your Chrome toolbar.

3. Click the three-dot menu and enter your free Gemini API key.

4. Ask your question in the popup.

5. Get instant, smart answers based on the page you’re viewing

## 🗂️ Project Structure

```
📁 gemini-chatbot-extension/
├── background.js         # Handles background logic and Gemini API calls
├── content.js            # Injects into pages to extract content
├── popup.html            # Chat interface UI
├── popup.js              # Chat logic & frontend behavior
├── options.html          # API key and user settings
├── options.js            # Save/load settings
├── Readability.js        # Clean content extraction
├── style.css             # Styling for popup and options page
├── manifest.json         # Chrome extension config
└── .gitignore            # Ignore unneeded files
```

## 🛠️ Development

### Prerequisites

Node.js (optional, for build tools or linting)

Google Chrome browser

### Setup

```bash
git clone https://github.com/MetaVAI/chat-box-extension.git
cd gemini-chatbot-extension
```

Then follow the installation steps above to load it into Chrome.

### 🤝 Contributing

Contributions are not only welcome—they're encouraged! If you’ve got ideas, bug fixes, or improvements, feel free to:

1. Fork the repo

2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -am 'Add some feature'
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request!

## 📄 License

MIT — feel free to use, modify, and distribute this project under the terms of the license.

> Built with 💬, ☕, and a sprinkle of Gemini intelligence.
