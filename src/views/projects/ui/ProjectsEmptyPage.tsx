import { Badge } from "@/shared/ui/Badge";

export function ProjectsEmptyPage() {
  return (
    <div className="flex flex-col">
      <PageToolbar />

      <div className="relative flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
            <div className="relative flex flex-col items-start gap-6 p-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)]">
                  no data sources configured
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-[var(--color-fg)]">
                  등록된 프로젝트가 없습니다
                </h2>
                <p className="max-w-xl text-[13px] leading-relaxed text-[var(--color-fg-muted)]">
                  프로젝트 지표 스키마와 외부 API 연동은 운영팀이 직접
                  파이프라인에 추가합니다. 신규 프로젝트 요청이 필요하면 담당
                  엔지니어에게 알려주세요.
                </p>
              </div>

              <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
                <MetaCard label="projects" value="0" hint="활성 프로젝트" />
                <MetaCard label="agents" value="0" hint="모니터링 대상" />
                <MetaCard label="data points / day" value="—" hint="수집 지표" />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <Badge tone="navy">READ ONLY</Badge>
                <span className="font-mono text-[11px] text-[var(--color-fg-subtle)]">
                  프로젝트 추가는 운영팀 전용 콘솔에서 수행됩니다
                </span>
              </div>
            </div>
          </div>

          <PlaceholderPanels />
        </div>
      </div>
    </div>
  );
}

function PageToolbar() {
  return (
    <div className="flex h-11 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
      <div className="flex items-center gap-3">
        <h1 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
          프로젝트
        </h1>
        <Badge tone="neutral">0 items</Badge>
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-fg-subtle)]">
        <span>last sync</span>
        <span className="text-[var(--color-fg-muted)]">—</span>
      </div>
    </div>
  );
}

function MetaCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[var(--color-fg)]">
        {value}
      </div>
      <div className="mt-1 text-[11.5px] text-[var(--color-fg-muted)]">{hint}</div>
    </div>
  );
}

function PlaceholderPanels() {
  const panels = [
    { title: "Latency p95", unit: "ms" },
    { title: "Success rate", unit: "%" },
    { title: "Token usage", unit: "tok/s" },
  ];
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {panels.map((p) => (
        <div
          key={p.title}
          className="flex h-36 flex-col justify-between rounded border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)]/60 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
              {p.title}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
              {p.unit}
            </span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-semibold tabular-nums text-[var(--color-fg-muted)]">
              —
            </span>
          </div>
          <div className="h-8 w-full bg-dots opacity-40" aria-hidden />
        </div>
      ))}
    </div>
  );
}
