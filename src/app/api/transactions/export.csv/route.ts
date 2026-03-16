import { exportService } from "@/features/export/export.service";
import { fromZodError } from "@/lib/api/errors";
import { handleRouteError } from "@/lib/api/responses";
import { filterQuerySchema } from "@/lib/validation/filter-query";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = filterQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    const result = await exportService.exportTransactions(parsed.data);

    return new Response(result.content, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${result.filename}"`,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
