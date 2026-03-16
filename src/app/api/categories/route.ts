import { categoryService } from "@/features/categories/category.service";
import { fromZodError } from "@/lib/api/errors";
import { created, handleRouteError, ok } from "@/lib/api/responses";
import { createCategorySchema } from "@/lib/validation/category";

export async function GET() {
  try {
    const items = await categoryService.listCategories();
    return ok({ items });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = createCategorySchema.safeParse(payload);
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    const category = await categoryService.createCategory(parsed.data);
    return created(category);
  } catch (error) {
    return handleRouteError(error);
  }
}
