type TransactionPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function TransactionPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: TransactionPaginationProps) {
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-600">
        Hiển thị {start}-{end} trên {totalItems} giao dịch
      </p>
      <div className="flex items-center gap-2">
        <button
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
        >
          Trước
        </button>
        <span className="text-sm text-zinc-600">
          Trang {currentPage}/{totalPages}
        </span>
        <button
          className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
