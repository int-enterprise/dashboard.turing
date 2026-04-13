import Link from "next/link";
import { PROJECTS } from "@/shared/config/projects";
import { Badge } from "@/shared/ui/Badge";

export function ProjectsListPage() {
  return (
    <div className="flex flex-col">
      <div className="flex h-11 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
            프로젝트
          </h1>
          <Badge tone="neutral">{PROJECTS.length} items</Badge>
        </div>
        <span className="font-mono text-[11px] text-[var(--color-fg-subtle)]">
          select a project to monitor
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col gap-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-accent-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                    project
                  </span>
                  <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
                    /
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-fg-muted)]">
                    {p.slug}
                  </span>
                </div>
                <Badge tone="navy">active</Badge>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[16px] font-semibold tracking-tight text-[var(--color-fg)]">
                  {p.name}
                </h3>
                <p className="text-[12.5px] text-[var(--color-fg-muted)]">
                  {p.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-3 font-mono text-[11px] text-[var(--color-fg-subtle)]">
                <span>{p.tagline}</span>
                <span className="transition-transform group-hover:translate-x-0.5 text-accent-500">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
