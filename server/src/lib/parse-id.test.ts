import { describe, expect, test } from "bun:test";
import { parseId } from "./parse-id.ts";

describe("parseId", () => {
  test("accepts positive integers", () => {
    expect(parseId("1")).toBe(1);
    expect(parseId("42")).toBe(42);
  });

  test("rejects invalid values", () => {
    for (const value of ["0", "-1", "1.5", "01", "abc", "", " 1", "1e3", "99999999999999999999", undefined, 5]) {
      expect(parseId(value)).toBeNull();
    }
  });
});
