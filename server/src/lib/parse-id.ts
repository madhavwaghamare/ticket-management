// Parses a numeric route param (e.g. `req.params.id`). Returns a positive integer, or null if invalid.
export function parseId(value: unknown): number | null {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}
