import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Copy Link Plus",
    description: "Copy current page URL in various formats",
    permissions: ["activeTab", "clipboardWrite", "scripting"],
    commands: {
      "copy-raw-url": {
        suggested_key: {
          default: "Alt+Shift+C",
          mac: "Command+Shift+C",
        },
        description: "Copy raw URL",
      },
      "copy-markdown": {
        suggested_key: {
          default: "Alt+Shift+X",
          mac: "Command+Shift+X",
        },
        description: "Copy as Markdown link",
      },
      "copy-two-lines": {
        description: "Copy as title and URL (two lines)",
      },
      "copy-title": {
        suggested_key: {
          default: "Alt+Shift+Z",
          mac: "Command+Shift+Z",
        },
        description: "Copy page title",
      },
    },
  },
});
