type TransactionPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export function TransactionPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: TransactionPaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  const nearbyPages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (page, index, pages) => page >= 1 && page <= totalPages && pages.indexOf(page) === index,
  );

  const hasLeadingGap = nearbyPages[0] > 2;
  const hasTrailingGap = nearbyPages[nearbyPages.length - 1] < totalPages - 1;

  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex items-center gap-2 text-sm text-zinc-600">
        <select
          aria-label="Số dòng mỗi trang"
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          value={pageSize}
        >
          <option value={5}>Per page: 5</option>
          <option value={10}>Per page: 10</option>
          <option value={20}>Per page: 20</option>
          <option value={50}>Per page: 50</option>
        </select>
      </label>

      <div className="overflow-x-auto">
        <div className="flex min-w-max items-center justify-end gap-1.5 whitespace-nowrap">
        <button
          aria-label="Trang trước"
          className="h-9 w-9 cursor-pointer rounded-full bg-transparent text-base font-extrabold text-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
        >
          <span aria-hidden="true">&lt;</span>
        </button>

        {nearbyPages[0] !== 1 ? (
          <button
            className="h-9 min-w-9 cursor-pointer rounded-full border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700"
            onClick={() => onPageChange(1)}
            type="button"
          >
            1
          </button>
        ) : null}

        {hasLeadingGap ? <span className="px-1 text-sm text-zinc-500">...</span> : null}

        {nearbyPages.map((page) => (
          <button
            aria-current={page === currentPage ? "page" : undefined}
            className={`h-9 min-w-9 rounded-full px-3 text-sm font-medium ${
              page === currentPage
                ? "bg-sky-600 text-white shadow-[0_10px_24px_-12px_rgba(2,132,199,0.75)]"
                : "cursor-pointer border border-zinc-300 bg-white text-zinc-700"
            }`}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}

        {hasTrailingGap ? <span className="px-1 text-sm text-zinc-500">...</span> : null}

        {nearbyPages[nearbyPages.length - 1] !== totalPages ? (
          <button
            className="h-9 min-w-9 cursor-pointer rounded-full border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-700"
            onClick={() => onPageChange(totalPages)}
            type="button"
          >
            {totalPages}
          </button>
        ) : null}

        <button
          aria-label="Trang sau"
          className="h-9 w-9 cursor-pointer rounded-full bg-transparent text-base font-extrabold text-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          <span aria-hidden="true">&gt;</span>
        </button>
        </div>
      </div>
    </div>
  );
}
