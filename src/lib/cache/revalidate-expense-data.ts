import { revalidatePath } from "next/cache";

export function revalidateExpenseData() {
  try {
    revalidatePath("/");
    revalidatePath("/dashboard");
  } catch {
    // `revalidatePath` requires a Next.js request context and is intentionally skipped in tests.
  }
}
