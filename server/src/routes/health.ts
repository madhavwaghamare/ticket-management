import { Router } from "express";
import type { HealthResponse } from "core/types/api";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  const body: HealthResponse = { ok: true, uptimeSeconds: Math.round(process.uptime()) };
  res.json(body);
});
