import { z } from "zod/v4";
import { Role } from "../constants/role.ts";

// Shared by the admin user-management form (client) and the users API (server).
export const createUserSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }),
  email: z.email({ error: "Enter a valid email address" }),
  password: z.string().min(8, { error: "Password must be at least 8 characters" }),
  role: z.enum([Role.Admin, Role.Agent]).default(Role.Agent),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
