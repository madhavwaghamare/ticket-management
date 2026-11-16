import type { ErrorRequestHandler, RequestHandler } from "express";
import type { ApiError } from "core/types/api";

// Throw this from any route to return a specific status code.
// Express 5 forwards errors thrown in async handlers to the error handler automatically.
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not Found" } satisfies ApiError);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // HttpError, or errors from Express middleware such as body-parser (err.status = 400/413)
  const status =
    err instanceof HttpError
      ? err.status
      : typeof err?.status === "number" && err.status >= 400 && err.status < 500
        ? err.status
        : 500;

  if (status >= 500) {
    console.error(err);
  }

  const message = status >= 500 ? "Internal Server Error" : String(err.message ?? "Bad Request");
  res.status(status).json({ error: message } satisfies ApiError);
};
