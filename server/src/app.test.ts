import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { once } from "node:events";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import type { HealthResponse } from "core/types/api";
import { createApp } from "./app.ts";

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  server = createApp().listen(0);
  await once(server, "listening");
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://localhost:${port}`;
});

afterAll(() => {
  server.close();
});

describe("API", () => {
  test("GET /api/health returns ok", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as HealthResponse;
    expect(body.ok).toBe(true);
    expect(typeof body.uptimeSeconds).toBe("number");
  });

  test("unknown API route returns 404 JSON", async () => {
    const res = await fetch(`${baseUrl}/api/does-not-exist`);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not Found" });
  });

  test("malformed JSON body returns 400 JSON", async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(typeof body.error).toBe("string");
  });
});
