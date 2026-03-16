import type { TransactionRecord } from "@/types/expense";

function escapeCell(value: string | number | null | undefined) {
  const text = String(value ?? "");
  const escaped = text.replaceAll('"', '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function exportTransactionsCsv(items: Array<
  Pick<TransactionRecord, "id" | "occurredAt" | "kind" | "amount" | "note" | "createdAt" | "updatedAt"> & {
    categoryName?: string;
  }
>) {
  const header = ["id", "occurredAt", "kind", "categoryName", "amount", "note", "createdAt", "updatedAt"];
  const rows = items.map((item) =>
    [
      item.id,
      item.occurredAt,
      item.kind,
      item.categoryName ?? "",
      item.amount,
      item.note ?? "",
      item.createdAt,
      item.updatedAt,
    ]
      .map(escapeCell)
      .join(","),
  );

  return [header.join(","), ...rows].join("\n");
}
