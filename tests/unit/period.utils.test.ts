import { describe, expect, it } from "vitest";

import { getPeriodLabel } from "@/features/dashboard/period.utils";

describe("dashboard period utils", () => {
  it("returns the Vietnamese label for each period", () => {
    expect(getPeriodLabel("day")).toBe("Ngày");
    expect(getPeriodLabel("week")).toBe("Tuần");
    expect(getPeriodLabel("month")).toBe("Tháng");
  });
});
