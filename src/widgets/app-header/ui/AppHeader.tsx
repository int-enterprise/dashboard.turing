import { ThemeToggle } from "@/features/theme/ui/ThemeToggle";
import { LogoutButton } from "@/features/auth/ui/LogoutButton";
import type { Theme } from "@/features/theme/model/types";
import { Breadcrumbs } from "./Breadcrumbs";

type Props = { theme: Theme };

export function AppHeader({ theme }: Props) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
      <Breadcrumbs />

      <div className="flex items-center gap-1">
        <StatusPill />
        <div className="mx-2 h-4 w-px bg-[var(--color-border)]" />
        <ThemeToggle theme={theme} />
        <LogoutButton />
      </div>
    </header>
  );
}

function StatusPill() {
  return (
    <div className="flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-[var(--color-fg-muted)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
      </span>
      live
    </div>
  );
}
