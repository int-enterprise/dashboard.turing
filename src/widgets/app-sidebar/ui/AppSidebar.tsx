import { isRoot, type User } from "@/entities/user";
import { Logo } from "@/shared/ui/Logo";
import { Badge } from "@/shared/ui/Badge";
import { SidebarNavItem } from "./SidebarNavItem";

type Props = { user: User };

export function AppSidebar({ user }: Props) {
  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-14 items-center gap-2 border-b border-[var(--color-border)] px-4">
        <Logo size={24} />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          console
        </span>
      </div>

      <div className="px-3 pt-4 pb-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
          observability
        </span>
      </div>
      <nav className="flex flex-col gap-0.5 px-2">
        <SidebarNavItem href="/projects" label="프로젝트" icon={<GridIcon />} />
      </nav>

      {isRoot(user) && (
        <>
          <div className="mt-4 px-3 pb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
              administration
            </span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            <SidebarNavItem href="/accounts" label="계정 관리" icon={<UsersIcon />} />
          </nav>
        </>
      )}

      <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-border)] px-3 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-primary-900 font-mono text-[11px] font-semibold text-base-100 dark:bg-accent-500 dark:text-primary-900">
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-mono text-[12px] text-[var(--color-fg)]">
            {user.username}
          </span>
          <Badge tone={isRoot(user) ? "accent" : "neutral"} className="mt-0.5 self-start">
            {isRoot(user) ? "root" : "iam"}
          </Badge>
        </div>
      </div>
    </aside>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
