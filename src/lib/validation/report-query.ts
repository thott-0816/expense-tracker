import { z } from "zod";

export const reportQuerySchema = z.object({
  month: z
    .string({ required_error: "month is required" })
    .regex(/^\d{4}-\d{2}$/, "month must match YYYY-MM")
    .refine((value) => {
      const [yearRaw, monthRaw] = value.split("-");
      const year = Number(yearRaw);
      const month = Number(monthRaw);
      return Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12;
    }, "month must be a valid month"),
  categoryId: z.string().trim().min(1).optional(),
});

export type ReportQueryInput = z.infer<typeof reportQuerySchema>;
