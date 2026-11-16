import type { Response } from "express";
import { z } from "zod/v4";
import type { ApiError } from "core/types/api";

// Parses `body` with `schema`. On failure, sends a 400 `{ error }` response and returns null,
// so handlers can do: `const data = validate(schema, req.body, res); if (!data) return;`
export function validate<T extends z.ZodType>(
  schema: T,
  body: unknown,
  res: Response,
): z.infer<T> | null {
  const result = schema.safeParse(body);
  if (result.success) return result.data;

  res.status(400).json({ error: z.prettifyError(result.error) } satisfies ApiError);
  return null;
}
