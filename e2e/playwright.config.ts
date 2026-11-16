import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Starts the server and client (or reuses ones already running from `bun run dev`).
  webServer: [
    {
      command: "bun run dev",
      cwd: "../server",
      url: "http://localhost:3000/api/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "bun run dev",
      cwd: "../client",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
