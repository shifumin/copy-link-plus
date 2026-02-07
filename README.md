# Copy Link Plus

A Chrome extension to copy the current page URL in various formats.

## Features

Copy the current page link in three formats:

| Format | Output Example |
|--------|----------------|
| Raw URL | `https://example.com/page` |
| Markdown | `[Page Title](https://example.com/page)` |
| Two Lines | `Page Title`<br>`https://example.com/page` |

## Usage

### Popup

Click the extension icon to open the popup and select a format.

### Keyboard Shortcuts

| Command | Windows/Linux | macOS |
|---------|---------------|-------|
| Raw URL | `Ctrl+Shift+C` | `Cmd+Shift+C` |
| Markdown | `Ctrl+Shift+X` | `Cmd+Shift+X` |
| Two Lines | `Ctrl+Shift+Z` | `Cmd+Shift+Z` |

Customize shortcuts at `chrome://extensions/shortcuts`.

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/) - Next-gen Web Extension Framework
- Manifest V3
