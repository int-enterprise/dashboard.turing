type Props = { passing: number; total: number };

export function SloBlock({ passing, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((passing / total) * 100);

  return (
    <div className="flex flex-col gap-2 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
          SLO 충족
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-[var(--color-fg-subtle)]">
          {pct}%
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-[26px] font-semibold tabular-nums tracking-tight text-[var(--color-fg)]">
          {passing}
        </span>
        <span className="font-mono text-[13px] text-[var(--color-fg-subtle)]">
          / {total}
        </span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-[var(--color-surface-muted)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
        "우수" 기준을 넘긴 지표 개수
      </p>
    </div>
  );
}
