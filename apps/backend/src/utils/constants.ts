export const STATUSES = {
  CREATED: "CREATED",
  DONE: "DONE",
} as const;

export type STATUSES = (typeof STATUSES)[keyof typeof STATUSES];
