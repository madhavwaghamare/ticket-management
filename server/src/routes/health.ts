import { Router } from "express";
import type { HealthResponse } from "core/types/api";
import { isDatabaseConnected } from "../lib/db.ts";

export const healthRouter = Router();

// 200 when the API and database are both up, 503 if the database is unreachable.
healthRouter.get("/", async (_req, res) => {
  const database = (await isDatabaseConnected()) ? "connected" : "unreachable";
  const body: HealthResponse = {
    ok: database === "connected",
    uptimeSeconds: Math.round(process.uptime()),
    database,
  };
  res.status(body.ok ? 200 : 503).json(body);
});
