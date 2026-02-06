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
| Markdown | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Two Lines | `Ctrl+Shift+T` | `Cmd+Shift+T` |

Customize shortcuts at `chrome://extensions/shortcuts`.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## Tech Stack

- TypeScript
- [WXT](https://wxt.dev/) - Next-gen Web Extension Framework
- Manifest V3
