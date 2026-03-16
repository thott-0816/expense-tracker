import { performance } from "node:perf_hooks";

import { describe, expect, it } from "vitest";

import { calculateDashboardAggregate } from "@/features/dashboard/dashboard.service";
import { parseFilterQuery } from "@/features/transactions/filter-query";
import { exportTransactionsCsv } from "@/lib/csv/export-transactions";

function measure<T>(fn: () => T) {
  const startedAt = performance.now();
  const result = fn();
  return { result, elapsedMs: performance.now() - startedAt };
}

describe("expense report performance", () => {
  it("parses 1000 filter query strings within an acceptable budget", () => {
    const { elapsedMs } = measure(() => {
      for (let index = 0; index < 1000; index += 1) {
        parseFilterQuery(
          new URLSearchParams({
            keyword: `lunch-${index}`,
            kind: index % 2 === 0 ? "expense" : "income",
            categoryId: `cat_${index % 8}`,
            fromDate: "2026-03-01",
            toDate: "2026-03-31",
          }),
        );
      }
    });

    expect(elapsedMs).toBeLessThan(75);
  });

  it("aggregates 5000 dashboard rows within an acceptable budget", () => {
    const dataset = Array.from({ length: 5000 }, (_, index) => ({
      kind: index % 4 === 0 ? "income" : "expense",
      amount: (index % 25) * 10000 + 5000,
      categoryId: `cat_${index % 12}`,
      categoryName: `Category ${index % 12}`,
    })) as Array<{ kind: "income" | "expense"; amount: number; categoryId: string; categoryName: string }>;

    const { result, elapsedMs } = measure(() => calculateDashboardAggregate("month", dataset));

    expect(result.balance).toBeTypeOf("number");
    expect(result.categoryBreakdown.length).toBeGreaterThan(0);
    expect(elapsedMs).toBeLessThan(80);
  });

  it("serializes 3000 transactions to CSV within an acceptable budget", () => {
    const dataset: Array<{
      id: string;
      occurredAt: string;
      kind: "expense" | "income";
      categoryName: string;
      amount: number;
      note: string;
      createdAt: string;
      updatedAt: string;
    }> = Array.from({ length: 3000 }, (_, index) => ({
      id: `txn_${index}`,
      occurredAt: "2026-03-14",
      kind: index % 2 === 0 ? "expense" : "income",
      categoryName: `Category ${index % 10}`,
      amount: index * 1000,
      note: `Row ${index}, value \"quoted\"`,
      createdAt: "2026-03-14T00:00:00.000Z",
      updatedAt: "2026-03-14T00:00:00.000Z",
    }));

    const { result, elapsedMs } = measure(() => exportTransactionsCsv(dataset));

    expect(result.startsWith("id,occurredAt")).toBe(true);
    expect(elapsedMs).toBeLessThan(120);
  });
});