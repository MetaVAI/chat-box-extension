const apiKeyInput = document.getElementById("api-key-input");
const saveButton = document.getElementById("save-button");
const status = document.getElementById("status");

// Load the saved API key when the options page is opened
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("apiKey", (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });
});

// Save the API key when the save button is clicked
saveButton.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (apiKey) {
    chrome.storage.sync.set({ apiKey: apiKey }, () => {
      status.textContent = "API key saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 2000);
    });
  }
});
