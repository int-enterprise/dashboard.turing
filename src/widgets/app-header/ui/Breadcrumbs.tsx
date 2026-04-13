"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  projects: "Projects",
  accounts: "Accounts",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs =
    segments.length === 0
      ? [{ label: "Home" }]
      : segments.map((s) => ({ label: LABELS[s] ?? s }));

  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 font-mono">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
        turing
      </span>
      <span className="text-[var(--color-fg-subtle)]" aria-hidden>
        /
      </span>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="text-[var(--color-fg-subtle)]" aria-hidden>
              /
            </span>
          )}
          <span
            className={
              i === crumbs.length - 1
                ? "text-[12.5px] font-medium text-[var(--color-fg)]"
                : "text-[12.5px] text-[var(--color-fg-subtle)]"
            }
          >
            {c.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
