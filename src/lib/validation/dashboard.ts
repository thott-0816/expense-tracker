import { z } from "zod";

export const dashboardQuerySchema = z.object({
  period: z.enum(["day", "week", "month"]),
  fromDate: z.string().date().optional(),
  toDate: z.string().date().optional(),
});

export type DashboardQueryInput = z.infer<typeof dashboardQuerySchema>;
