import { defineConfig } from "prisma/config";

// Run the CLI through the package scripts (`bun run db:migrate`, ...), which load server/.env.
// DATABASE_URL may be unset for `prisma generate` (e.g. postinstall on a fresh clone);
// commands that talk to the database will report it missing.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
