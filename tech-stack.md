# Tech Stack

## Frontend

- React with TypeScript (Vite)
- Tailwind CSS + shadcn/ui
- React Router
- TanStack React Query (server state) + Axios (HTTP)
- React Hook Form + Zod (forms)

## Backend

- Bun + Express with TypeScript
- Better Auth (email/password, database sessions)
- pg-boss job queue (PostgreSQL-backed) for background AI work

## Database

- PostgreSQL

## ORM

- Prisma

## AI

- OpenAI GPT-5 Nano via the Vercel AI SDK (`@ai-sdk/openai`) for ticket classification, auto-resolution, summaries, and suggested replies

## Email

- SendGrid (inbound parse webhook + outbound replies)

## Testing

- Vitest + React Testing Library (component tests)
- Playwright (E2E)
- `bun test` (server)

## Deployment

- Docker + cloud provider (AWS, Railway, Fly.io, etc.)
