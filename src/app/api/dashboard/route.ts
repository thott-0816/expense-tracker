import { dashboardService } from "@/features/dashboard/dashboard.service";
import { fromZodError } from "@/lib/api/errors";
import { handleRouteError, ok } from "@/lib/api/responses";
import { dashboardQuerySchema } from "@/lib/validation/dashboard";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = dashboardQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      throw fromZodError(parsed.error);
    }

    const aggregate = await dashboardService.getDashboardAggregate(parsed.data);
    return ok(aggregate);
  } catch (error) {
    return handleRouteError(error);
  }
}
