# Helpdesk

AI-powered support ticket system. See `CLAUDE.md` for conventions, `project-scope.md` for requirements, `tech-stack.md`, and `implementation-plan.md`.

## Project structure
```
.
├── core/      # Shared Zod schemas, constants, and types (imported as `core/...`)
│   ├── constants/   # e.g. role.ts, ticket.ts
│   ├── schemas/     # e.g. users.ts
│   └── types/       # e.g. api.ts
├── client/    # React + Vite + shadcn/ui (:5173, proxies /api → VITE_API_URL or :3000)
├── server/    # Express 5 API on Bun (:3000)
│   └── src/
│       ├── app.ts         # createApp(): middleware, routes, error handling
│       ├── index.ts       # starts the HTTP server
│       ├── env.ts         # environment variable validation (zod)
│       ├── lib/           # validate, parseId helpers
│       ├── routes/        # Express Router modules
│       └── middleware/    # error/404 handlers
└── e2e/       # Playwright E2E tests
```

## Getting started
```sh
bun install
cp .env.example server/.env
bun run dev          # or: cd server && bun run dev / cd client && bun run dev
```
Open http://localhost:5173. The page should show **API status: connected**.

For E2E tests, install the browser once: `cd e2e && bunx playwright install chromium`.

## Scripts (run from the repo root)
| Command | What it does |
|---|---|
| `bun run dev` | Start the server (watch mode) and the client together |
| `bun run dev:server` / `bun run dev:client` | Start one side only |
| `bun run test` | Server tests (`bun test`) + client component tests (Vitest) |
| `bun run test:e2e` | Playwright E2E tests (starts the apps if they aren't running) |
| `bun run typecheck` | Type-check all workspaces |
| `bun run build` | Build the client to `client/dist` |
| `bun run start` | Run the server in production mode (also serves `client/dist`) |

Client tests run under Bun (`bun --bun vitest`) because Vitest 5 needs Node 22+.

## Adding dependencies
Run `bun add` inside the workspace that needs the package:
```sh
cd server && bun add some-package
cd client && bunx --bun shadcn@latest add dialog   # shadcn/ui components
```
