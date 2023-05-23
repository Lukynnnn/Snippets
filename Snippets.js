// ==UserScript==
// @name         Snippets Script by Lukynnn
// @website    lukynnn.tk
// @version      1.0.0
// @description  Custom snippets for BetterDiscord
// @author       Lukynnn
// ==/UserScript==

// Load snippets configuration from Snippets.config.json file
function loadSnippetsConfig(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "Snippets.config.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const snippetsConfig = JSON.parse(xhr.responseText);
      callback(snippetsConfig);
    }
  };
  xhr.send(null);
}

// Insert a snippet into the chat input
function insertSnippet(snippet) {
  const textarea = document.querySelector(".channelTextArea-2ACPy6 textarea");
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const textBefore = value.substring(0, start);
    const textAfter = value.substring(end, value.length);
    const insertedText = `${snippet.code} `;
    textarea.value = `${textBefore}${insertedText}${textAfter}`;
    textarea.selectionStart = textarea.selectionEnd = start + insertedText.length;
    textarea.focus();
  }
}

// Create a snippet button element
function createSnippetButton(snippet) {
  const button = document.createElement("button");
  button.textContent = snippet.name;
  button.title = snippet.description;
  button.className = "snippet-button";
  button.addEventListener("click", () => insertSnippet(snippet));
  return button;
}

// Inject snippet buttons into the chat input area
function injectSnippetButtons(snippets) {
  const messageEditor = document.querySelector(".channelTextArea-2ACPy6");
  if (!messageEditor) return;

  const existingButtons = document.querySelectorAll(".snippet-button");
  existingButtons.forEach((button) => button.remove());

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "snippet-button-container";

  snippets.forEach((snippet) => {
    const button = createSnippetButton(snippet);
    buttonContainer.appendChild(button);
  });

  messageEditor.appendChild(buttonContainer);
}

// Wait for DOMContentLoaded event before injecting snippet buttons
document.addEventListener("DOMContentLoaded", () => {
  loadSnippetsConfig((snippetsConfig) => {
    const snippets = snippetsConfig.snippets;
    injectSnippetButtons(snippets);
  });
});