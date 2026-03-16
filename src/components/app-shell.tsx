import type { ReactNode } from "react";

type AppShellProps = {
  accent: "sky" | "orange";
  badge: string;
  title: string;
  description: string;
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

export function AppShell({ accent, badge, title, description, actions, children }: AppShellProps) {
  return (
    <main className={`min-h-screen px-4 py-8 text-zinc-950 sm:px-6 lg:px-8 ${accentStyles[accent].background}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_60px_-22px_rgba(15,23,42,0.28)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <p className={`text-sm font-medium uppercase tracking-[0.22em] ${accentStyles[accent].badge}`}>{badge}</p>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">{description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <nav aria-label="Điều hướng ứng dụng" className="flex flex-wrap gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/90 p-1.5">
                <NavLink accent={accent} href="/" isActive={accent === "sky"} label="Giao dịch" />
                <NavLink accent={accent} href="/dashboard" isActive={accent === "orange"} label="Dashboard" />
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
