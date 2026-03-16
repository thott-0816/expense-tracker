import { z } from "zod";

export const categoryTypeSchema = z.enum(["income", "expense", "both"]);

export const createCategorySchema = z.object({
  name: z.string().trim().min(2).max(50),
  type: categoryTypeSchema,
  description: z.string().trim().max(255).optional().or(z.literal("")),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
