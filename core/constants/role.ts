// User roles. `as const` object (not an enum) so it works with `erasableSyntaxOnly`.
export const Role = {
  Admin: "admin",
  Agent: "agent",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
