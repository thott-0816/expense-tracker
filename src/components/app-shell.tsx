import type { ReactNode } from "react";

type AppShellProps = {
  accent: "sky" | "orange";
  currentView?: "transactions" | "dashboard";
  badge: string;
  title?: string;
  description?: string;
  compact?: boolean;
  actions?: ReactNode;
  children: ReactNode;
};

const accentStyles = {
  sky: {
    background: "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)]",
    badge: "text-sky-700",
    active: "bg-sky-600 text-white shadow-[0_10px_24px_-12px_rgba(2,132,199,0.75)]",
  },
  orange: {
    background: "bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_34%),linear-gradient(180deg,#fff7ed_0%,#fffbeb_100%)]",
    badge: "text-orange-700",
    active: "bg-orange-500 text-white shadow-[0_10px_24px_-12px_rgba(249,115,22,0.75)]",
  },
} as const;

type NavItem = {
  href: string;
  label: string;
  isActive: boolean;
};

function NavLink({ href, label, isActive, accent }: NavItem & { accent: AppShellProps["accent"] }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isActive ? accentStyles[accent].active : "text-zinc-600 hover:bg-white"
      }`}
      href={href}
    >
      {label}
    </a>
  );
}

export function AppShell({ accent, currentView, badge, title, description, compact = false, actions, children }: AppShellProps) {
  const activeView = currentView ?? (accent === "orange" ? "dashboard" : "transactions");
  const hasHeaderText = Boolean(title || description);

  return (
    <main className={`min-h-screen px-4 py-6 text-zinc-950 sm:px-6 lg:px-8 ${accentStyles[accent].background}`}>
      <div className={`mx-auto flex w-full max-w-6xl flex-col ${compact ? "gap-5" : "gap-6"}`}>
        <header className={`rounded-[28px] border border-white/80 bg-white/90 shadow-[0_18px_60px_-22px_rgba(15,23,42,0.28)] backdrop-blur ${compact ? "p-5" : "p-6"}`}>
          <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between ${compact ? "gap-4" : "gap-4"}`}>
            <div className={compact ? "space-y-2.5" : "space-y-3"}>
              <p className={`text-base font-semibold uppercase tracking-[0.18em] sm:text-lg ${accentStyles[accent].badge}`}>{badge}</p>
              {hasHeaderText ? (
                <div>
                  {title ? <h1 className={`font-semibold tracking-tight ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{title}</h1> : null}
                  {description ? <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">{description}</p> : null}
                </div>
              ) : null}
            </div>
            <div className={`flex flex-col lg:items-end ${compact ? "gap-3" : "gap-4"}`}>
              <nav aria-label="Điều hướng ứng dụng" className="flex flex-wrap gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/90 p-1.5">
                <NavLink accent={accent} href="/dashboard" isActive={activeView === "dashboard"} label="Dashboard" />
                <NavLink accent={accent} href="/" isActive={activeView === "transactions"} label="Giao dịch" />
              </nav>
              {actions ? <div className="flex flex-wrap justify-start gap-3 lg:justify-end">{actions}</div> : null}
            </div>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
