export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-28 animate-pulse rounded-2xl bg-zinc-200/80" />
      ))}
    </div>
  );
}
