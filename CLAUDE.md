# CLAUDE.md

## Project Overview

Copy Link Plus — A Chrome extension that copies the current page URL in 4 formats (Raw URL / Markdown / Two Lines / Title).

**Tech Stack**: TypeScript, [WXT](https://wxt.dev/) (Manifest V3), Vitest, [Biome](https://biomejs.dev/) (linter/formatter)

## Architecture

```
entrypoints/
├── background.ts          # Keyboard shortcut handling (Service Worker), page toast injection
└── popup/
    ├── index.html         # Popup HTML template
    ├── main.ts            # Popup UI and event handling (format-aware copy status)
    └── style.css          # Popup styles (dark mode support, format preview monospace styling)
utils/
├── formatters.ts          # Link format core logic (pure functions, format display labels)
├── formatters.test.ts     # Unit tests for formatters
├── shortcuts.ts           # Keyboard shortcut fetching and display formatting
└── shortcuts.test.ts      # Unit tests for shortcuts
public/icon/               # Extension icons (16–128px)
```

- Path alias: `@/` → project root
- WXT global functions (`defineBackground`, `browser`, etc.) do not need to be imported

## Development Commands

```bash
mise exec -- pnpm dev        # Start dev server (hot reload)
mise exec -- pnpm build      # Production build
mise exec -- pnpm compile    # Type check (tsc --noEmit)
mise exec -- pnpm lint       # Lint and format check (Biome)
mise exec -- pnpm lint:fix   # Lint and format with auto-fix
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
