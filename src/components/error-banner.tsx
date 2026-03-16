type ErrorBannerProps = {
  message: string;
};

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div
      aria-live="assertive"
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-[0_12px_40px_-28px_rgba(220,38,38,0.75)]"
      role="alert"
    >
      {message}
    </div>
  );
}