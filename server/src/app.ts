import path from "node:path";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/errors.ts";
import { healthRouter } from "./routes/health.ts";

type AppOptions = {
  // In production, Express serves the built React app so the client and API share one origin
  // (required for the session cookie to work without cross-site cookie settings).
  serveClient?: boolean;
};

export function createApp({ serveClient = false }: AppOptions = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  // API routes
  app.use("/api/health", healthRouter);
  app.use("/api", notFoundHandler);

  if (serveClient) {
    const clientDist = path.resolve(import.meta.dir, "../../client/dist");
    app.use(express.static(clientDist));
    // SPA fallback: let React Router handle any non-API path (Express 5 wildcard syntax)
    app.get("/{*splat}", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  app.use(errorHandler);

  return app;
}
