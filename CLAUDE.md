# CLAUDE.md

## Project Overview

Copy Link Plus — A Chrome extension that copies the current page URL in 3 formats (Raw URL / Markdown / Two Lines).

**Tech Stack**: TypeScript, [WXT](https://wxt.dev/) (Manifest V3), Vitest

## Architecture

```
entrypoints/
├── background.ts          # Keyboard shortcut handling (Service Worker)
└── popup/
    ├── index.html         # Popup HTML template
    ├── main.ts            # Popup UI and event handling
    └── style.css          # Popup styles (dark mode support)
utils/
├── formatters.ts          # Link format core logic (pure functions)
└── formatters.test.ts     # Unit tests for formatters
public/icon/               # Extension icons (16–128px)
```

- Path alias: `@/` → project root
- WXT global functions (`defineBackground`, `browser`, etc.) do not need to be imported

## Development Commands

```bash
mise exec -- pnpm dev        # Start dev server (hot reload)
mise exec -- pnpm build      # Production build
mise exec -- pnpm compile    # Type check (tsc --noEmit)
mise exec -- pnpm test       # Run tests (Vitest)
mise exec -- pnpm zip        # Create ZIP for Chrome Web Store
```

## Testing Conventions

- **Framework**: Vitest
- **Location**: Place `*.test.ts` in the same directory as the test target
- **Structure**: Group with `describe`, cover normal cases, error cases, and edge cases
- **Scope**: Only test public functions (private methods are out of scope)

## Code Conventions

- TypeScript strict mode
- Prefer arrow functions
- Naming: camelCase (variables/functions), PascalCase (types), kebab-case (CSS classes)
