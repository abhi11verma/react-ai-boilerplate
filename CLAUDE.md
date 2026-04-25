# Claude Code — Project Guide

## Stack

| Layer | Tool |
|---|---|
| Bundler | Vite 8 + React 19 + TypeScript 6 (strict) |
| Styling | Tailwind CSS v3 + shadcn/ui (CSS variable theme) |
| State | Zustand v5 |
| Linting | ESLint 10 flat config (`eslint-plugin-import-x`, `typescript-eslint strictTypeChecked`) |
| Task runner | `just` — run `just` to list all commands |

## Read These First

Detailed rules live in `/context/`. Read the relevant file before starting any task:

| File | Read when... |
|---|---|
| [`context/agent-instructions.md`](context/agent-instructions.md) | Before writing any code — non-negotiable rules |
| [`context/folder-structure.md`](context/folder-structure.md) | Deciding where a new file goes |
| [`context/coding-rules.md`](context/coding-rules.md) | TypeScript, imports, component conventions |
| [`context/shadcn-guide.md`](context/shadcn-guide.md) | Adding UI components or changing the theme |

## Critical Rules (inline summary)

- **`@/` alias always** — never use `../` to cross folder boundaries
- **Named exports only** — no `export default`
- **No `any`** — use `unknown` + type narrowing
- **Global state** → `src/store/` (Zustand). Local UI state → `useState`
- **UI components** → `just add-ui <name>` then import from `@/components/ui/<name>`
- **Colors** → CSS variable tokens only (`text-foreground`, `bg-primary`). Never hardcode hex/rgb
- **No new dependencies** without explicit user approval

## Key Commands

```bash
just dev                   # start dev server
just build                 # tsc + vite build
just lint                  # eslint
just add-ui button         # add a shadcn component
just list-ui               # see installed components
just apply-theme zinc      # swap the color palette
```

## Folder Quick-Reference

```
src/
  app/          # global providers — add providers here, not in main.tsx
  components/   # shared UI; ui/ is shadcn-generated (do not edit manually)
  modules/      # feature code — each module exposes a public index.ts
  store/        # Zustand stores, one file per domain
  lib/          # pure utilities (no React, no side effects)
  hooks/        # shared hooks used by 2+ modules
  types/        # global ambient type declarations
```

## Before Every Task

1. Check `context/agent-instructions.md` for hard rules
2. Check `context/folder-structure.md` for where the new file belongs
3. Run `just lint` and `just build` before marking anything done
