// API response types shared by the client and server.

export type HealthResponse = {
  ok: true;
  uptimeSeconds: number;
};

export type ApiError = {
  error: string;
};
