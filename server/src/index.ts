import { createApp } from "./app.ts";
import { env } from "./env.ts";
import { prisma } from "./lib/db.ts";

async function boot() {
  await prisma.$connect();

  const app = createApp({ serveClient: env.NODE_ENV === "production" });
  const server = app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = () => {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

boot().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
