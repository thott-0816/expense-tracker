type ExportCsvButtonProps = {
  href: string;
};

export function ExportCsvButton({ href }: ExportCsvButtonProps) {
  return (
    <a
      className="inline-flex min-h-11 min-w-32 items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(2,132,199,0.75)] transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
      href={href}
    >
      Xuất CSV
    </a>
  );
}
