import type { ProjectMeta } from "@/shared/config/projects";
import { Badge } from "@/shared/ui/Badge";

type Props = { project: ProjectMeta; error: unknown };

export function DashboardError({ project, error }: Props) {
  const message = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="flex flex-col">
      <div className="flex h-11 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
            {project.name}
          </h1>
          <Badge tone="navy">project</Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="rounded border border-critical-300 bg-critical-100 p-5 dark:border-critical-700 dark:bg-critical-900/40">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-critical-500" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-critical-600 dark:text-critical-300">
              upstream error
            </span>
          </div>
          <h2 className="mt-2 text-[14px] font-semibold text-[var(--color-fg)]">
            외부 API 호출에 실패했습니다
          </h2>
          <p className="mt-1 text-[12.5px] text-[var(--color-fg-muted)]">
            Donkey 서비스에서 데이터를 받지 못했습니다. 네트워크, API 키, 엔드포인트 설정을 확인해 주세요.
          </p>
          <pre className="mt-3 overflow-auto rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-3 font-mono text-[11px] text-[var(--color-fg-muted)]">
            {message}
          </pre>
        </div>
      </div>
    </div>
  );
}
