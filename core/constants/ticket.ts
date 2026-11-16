// `new` and `processing` are system-managed (AI working) and never shown in the agent UI.
export type TicketStatus = "new" | "processing" | "open" | "resolved" | "closed";

// Statuses agents can see and filter by.
export type AgentTicketStatus = Exclude<TicketStatus, "new" | "processing">;

export type TicketCategory = "general_question" | "technical_question" | "refund_request";
