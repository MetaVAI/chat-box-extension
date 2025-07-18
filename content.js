console.log("Content script loaded.");

// Inject Readability.js into the page
const s = document.createElement('script');
s.src = chrome.runtime.getURL('Readability.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

// This script is injected into the active tab.
// It listens for a message from the popup to extract the page content.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.type === "getContent") {
    let pageContent = document.body.innerText; // Fallback content

    // Try to use Readability to get the main article content
    try {
      const documentClone = document.cloneNode(true);
      const article = new Readability(documentClone).parse();
      if (article && article.textContent) {
        pageContent = article.textContent;
        console.log("Readability extracted content.");
      } else {
        console.log("Readability failed to extract content, using full body text.");
      }
    } catch (e) {
      console.error("Error using Readability:", e);
      console.log("Readability failed, using full body text.");
    }

    sendResponse({ content: pageContent });
  }
});
