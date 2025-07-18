console.log("Background script loaded.");

// This script runs in the background and handles the streaming API call.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background:", request);
  if (request.type === "getGeminiAnswer") {
    // Get the API key from storage.
    chrome.storage.sync.get("apiKey", (data) => {
      const apiKey = data.apiKey;
      console.log("Retrieved API key from storage.");

      // If the key is missing, send a clear error to the popup.
      if (!apiKey) {
        console.error("API key is not set.");
        chrome.runtime.sendMessage({ // Send to popup
          type: "streamError",
          error: "API key not set. Please right-click the extension icon, go to Options, and set your key.",
        });
        return;
      }
      // Proceed with the API call
      console.log("API key found. Starting stream...");
      streamGeminiAnswer(request, apiKey, request.tabId); // Use the tabId from the request
    });
    // Return true to indicate that we will respond asynchronously.
    return true;
  }
});

async function streamGeminiAnswer(request, apiKey, tabId) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:streamGenerateContent?key=${apiKey}&alt=sse`;
  console.log("Streaming from URL:", url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Based on the following content, answer the question: "${request.question}"\n\nContent:\n${request.content}`
          }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("Stream complete.");
        chrome.runtime.sendMessage({ type: "streamComplete" });
        break;
      }
      
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonString = line.substring(6).trim();
          if (jsonString) {
            try {
              const parsed = JSON.parse(jsonString);
              if (parsed.error) {
                throw new Error(parsed.error.message);
              }
              const text = parsed.candidates[0].content.parts[0].text;
              console.log("Sending chunk to popup:", text);
              chrome.runtime.sendMessage({ type: "streamChunk", chunk: text });
            } catch (e) {
              console.error("Failed to parse stream chunk:", jsonString, e);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    chrome.runtime.sendMessage({ // Send to popup
      type: "streamError",
      error: `API Error: ${error.message}`,
    });
  }
}
