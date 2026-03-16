import { z } from "zod";

export const filterQuerySchema = z
  .object({
    fromDate: z.string().date().optional(),
    toDate: z.string().date().optional(),
    kind: z.enum(["income", "expense", "all"]).optional(),
    categoryId: z.string().min(1).optional(),
    keyword: z.string().trim().max(100).optional(),
    period: z.enum(["day", "week", "month"]).optional(),
  })
  .refine(
    ({ fromDate, toDate }) => !(fromDate && toDate) || fromDate <= toDate,
    {
      message: "fromDate must be before or equal to toDate",
      path: ["fromDate"],
    },
  );

export type FilterQueryInput = z.infer<typeof filterQuerySchema>;
