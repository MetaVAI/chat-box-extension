console.log("Popup script loaded.");

const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
let botMessageElement = null; // To hold the current bot message element

// Function to add a message to the chat
function addMessage(text, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", `${sender}-message`);
  messageElement.textContent = text;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageElement;
}

// Event listener for the send button
sendButton.addEventListener("click", () => {
  console.log("Send button clicked.");
  const question = messageInput.value.trim();
  if (question) {
    addMessage(question, "user");
    messageInput.value = "";
    sendButton.disabled = true;
    botMessageElement = addMessage("Thinking...", "bot");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      console.log(`Active tab found: ${tabId}`);

      // First, inject the content script
      console.log("Injecting content script...");
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      }, () => {
        console.log("Content script injected. Sending message to get content...");
        // Then, ask the content script for the page's content
        chrome.tabs.sendMessage(tabId, { type: "getContent" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error getting content:", chrome.runtime.lastError.message);
            botMessageElement.textContent = `Error: ${chrome.runtime.lastError.message}`;
            sendButton.disabled = false;
            return;
          }
          console.log("Content received from content script.");
          // Finally, send the content, question, and tabId to the background script
          console.log("Sending message to background script...");
          chrome.runtime.sendMessage({
            type: "getGeminiAnswer",
            question: question,
            content: response.content,
            tabId: tabId, // Pass the tabId to the background script
          });
        });
      });
    });
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received from background:", request);
  if (request.type === "streamChunk") {
    if (botMessageElement.textContent === "Thinking...") {
      botMessageElement.textContent = ""; // Clear the 'Thinking...' message
    }
    botMessageElement.textContent += request.chunk;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else if (request.type === "streamError") {
    botMessageElement.textContent = request.error; // Display the error
    sendButton.disabled = false;
  } else if (request.type === "streamComplete") {
    sendButton.disabled = false;
    // Add a copy button if the message is complete and not an error
    if (!botMessageElement.textContent.startsWith("API Error")) {
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";
        copyButton.onclick = () => {
            navigator.clipboard.writeText(botMessageElement.textContent);
            copyButton.textContent = "Copied!";
            setTimeout(() => { copyButton.textContent = "Copy"; }, 2000);
        };
        botMessageElement.appendChild(copyButton);
    }
  }
});
