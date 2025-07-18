console.log("Content script loaded.");

// This script is injected into the active tab.

// It listens for a message from the popup to extract the page content.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.type === "getContent") {
    sendResponse({ content: document.body.innerText });
  }
});
