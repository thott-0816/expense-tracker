import { describe, expect, it } from "vitest";

import { exportTransactionsCsv } from "@/lib/csv/export-transactions";

describe("transactions csv export", () => {
  it("escapes quotes and commas according to RFC 4180", () => {
    const csv = exportTransactionsCsv([
      {
        id: "txn_1",
        occurredAt: "2026-03-14",
        kind: "expense",
        categoryName: "Food",
        amount: 120000,
        note: 'Bua trua, "ngoai"',
        createdAt: "2026-03-14T00:00:00.000Z",
        updatedAt: "2026-03-14T00:00:00.000Z",
      },
    ]);

    expect(csv).toContain('"Bua trua, ""ngoai"""');
    expect(csv.split("\n")).toHaveLength(2);
  });
});
