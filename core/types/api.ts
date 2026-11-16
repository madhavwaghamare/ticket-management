// API response types shared by the client and server.

export type HealthResponse = {
  ok: boolean;
  uptimeSeconds: number;
  database: "connected" | "unreachable";
};

export type ApiError = {
  error: string;
};
