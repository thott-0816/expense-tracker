import { z } from "zod";

export const transactionKindSchema = z.enum(["income", "expense"]);

const noteSchema = z.string().trim().max(500).optional().or(z.literal(""));

export const createTransactionSchema = z.object({
  kind: transactionKindSchema,
  amount: z.coerce.number().positive(),
  occurredAt: z.string().date(),
  categoryId: z.string().min(1),
  note: noteSchema,
});

export const updateTransactionSchema = createTransactionSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field must be updated",
);

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
