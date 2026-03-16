import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { parseFilterQuery } from "@/features/transactions/filter-query";

describe("filter query parser", () => {
  it("normalizes filter values from URLSearchParams", () => {
    const result = parseFilterQuery(
      new URLSearchParams({
        fromDate: "2026-03-01",
        toDate: "2026-03-31",
        kind: "expense",
        categoryId: "cat_food",
        keyword: "lunch",
      }),
    );

    expect(result).toEqual({
      fromDate: "2026-03-01",
      toDate: "2026-03-31",
      kind: "expense",
      categoryId: "cat_food",
      keyword: "lunch",
    });
  });

  it("trims keyword and omits it when blank", () => {
    const trimmed = parseFilterQuery(new URLSearchParams({ keyword: "  lunch  " }));
    const blank = parseFilterQuery(new URLSearchParams({ keyword: "   " }));

    expect(trimmed).toEqual({ keyword: "lunch" });
    expect(blank).toEqual({});
  });

  it("throws a validation error when the date range is invalid", () => {
    expect(() =>
      parseFilterQuery(
        new URLSearchParams({
          fromDate: "2026-03-31",
          toDate: "2026-03-01",
        }),
      ),
    ).toThrow(ApiError);
  });
});
