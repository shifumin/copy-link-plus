# Copy Link Plus

A Chrome extension to copy the current page URL in various formats.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shifumin/copy-link-plus.git
   cd copy-link-plus
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the extension:
   ```bash
   pnpm build
   ```
4. Open `chrome://extensions/` in Chrome
5. Enable **Developer mode** (toggle in the top right)
6. Click **Load unpacked** and select the `.output/chrome-mv3` directory

## Features

Copy the current page link in four formats:

| Format | Output Example |
|--------|----------------|
| Raw URL | `https://example.com/page` |
| Markdown | `[Page Title](https://example.com/page)` |
| Two Lines | `Page Title`<br>`https://example.com/page` |
| Title | `Page Title` |

## Usage

### Popup

Click the extension icon to open the popup and select a format. A status message shows which format was copied.

### Keyboard Shortcuts

| Command | Windows/Linux | macOS |
|---------|---------------|-------|
| Raw URL | `Alt+Shift+C` | `Cmd+Shift+C` |
| Markdown | `Alt+Shift+X` | `Cmd+Shift+X` |
| Two Lines | *(none)* | *(none)* |
| Title | `Alt+Shift+Z` | `Cmd+Shift+Z` |

These are default shortcuts. You can customize them at `chrome://extensions/shortcuts`.

A toast notification appears on the page confirming the copied format.

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/)
- Manifest V3
