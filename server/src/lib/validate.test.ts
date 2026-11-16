import { describe, expect, mock, test } from "bun:test";
import type { Response } from "express";
import { createUserSchema } from "core/schemas/users";
import { validate } from "./validate.ts";

function mockRes() {
  const res = { status: mock(() => res), json: mock(() => res) };
  return res as typeof res & Response;
}

describe("validate", () => {
  test("returns parsed data on success", () => {
    const res = mockRes();
    const data = validate(createUserSchema, { name: " Ana ", email: "ana@example.com", password: "secret123" }, res);
    expect(data).toEqual({ name: "Ana", email: "ana@example.com", password: "secret123", role: "agent" });
    expect(res.status).not.toHaveBeenCalled();
  });

  test("sends 400 and returns null on failure", () => {
    const res = mockRes();
    expect(validate(createUserSchema, { email: "nope" }, res)).toBeNull();
    expect(res.status).toHaveBeenCalledWith(400);
    const [[body]] = res.json.mock.calls as unknown as [[{ error: string }]];
    expect(body.error).toContain("email");
  });
});
