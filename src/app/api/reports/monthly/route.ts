import { reportService } from "@/features/reports/report.service";
import { fromZodError } from "@/lib/api/errors";
import { handleRouteError, ok } from "@/lib/api/responses";
import { logEvent } from "@/lib/logger";
import { reportQuerySchema } from "@/lib/validation/report-query";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = reportQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    logEvent("info", "report.request.received", {
      month: parsed.data.month,
      categoryId: parsed.data.categoryId ?? null,
    });

    const payload = await reportService.getMonthlyReport(parsed.data);
    return ok(payload);
  } catch (error) {
    return handleRouteError(error);
  }
}
