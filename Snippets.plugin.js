/**
 * @name Snippets script
 * @author Lukynnn
 * @authorID 985867939649552394
 * @description Snippets script for BetterDiscord
 * @website https://lukynnn.tk
 * @source https://github.com/Lukynnnn/Snippets
 * @version 1.0.0
 */

module.exports = class SnippetsPlugin {
  start() {
    this.injectSnippetMenu();
  }

  stop() {
    this.removeSnippetMenu();
  }

  injectSnippetMenu() {
    const createMenuItem = (label, onClick) => {
      const menuItem = document.createElement("div");
      menuItem.className = "item-1Yvehc";
      menuItem.textContent = label;
      menuItem.addEventListener("click", onClick);
      return menuItem;
    };

    const createSnippetSubMenu = () => {
      const snippetSubMenu = document.createElement("div");
      snippetSubMenu.className = "itemGroup-1tL0uz";

      snippetSubMenu.appendChild(createMenuItem("Lenny Face", () => this.insertSnippet("( ͡° ͜ʖ ͡°)")));
      snippetSubMenu.appendChild(createMenuItem("Table Flip", () => this.insertSnippet("(╯°□°）╯︵ ┻━┻")));
      snippetSubMenu.appendChild(createMenuItem("Shrug", () => this.insertSnippet("¯\\_(ツ)_/¯")));

      return snippetSubMenu;
    };

    const insertContextMenu = (element) => {
      element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const snippetSubMenu = createSnippetSubMenu();

        const existingContextMenu = document.querySelector(".contextMenu-uoJTbz");
        if (existingContextMenu) {
          const existingSubMenu = existingContextMenu.querySelector(".itemGroup-1tL0uz");
          if (existingSubMenu) {
            existingSubMenu.appendChild(snippetSubMenu);
          }
        }
      });
    };

    const messageEditor = document.querySelector(".channelTextArea-2ACPy6");
    if (messageEditor) {
      insertContextMenu(messageEditor);
    }
  }

  removeSnippetMenu() {
    const snippetSubMenu = document.querySelector(".itemGroup-1tL0uz");
    if (snippetSubMenu) {
      snippetSubMenu.remove();
    }
  }

  insertSnippet(text) {
    const textarea = document.querySelector(".channelTextArea-2ACPy6 textarea");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end, value.length);
      const insertedText = `${text} `;
      textarea.value = `${textBefore}${insertedText}${textAfter}`;
      textarea.selectionStart = textarea.selectionEnd = start + insertedText.length;
      textarea.focus();
    }
  }
};
