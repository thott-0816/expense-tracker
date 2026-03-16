type ExportCsvButtonProps = {
  href: string;
};

export function ExportCsvButton({ href }: ExportCsvButtonProps) {
  return (
    <a className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50" href={href}>
      Xuất CSV
    </a>
  );
}
