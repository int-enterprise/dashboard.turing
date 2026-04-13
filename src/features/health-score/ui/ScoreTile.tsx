import { Badge } from "@/shared/ui/Badge";
import type { HealthBreakdown } from "../model/aggregate";
import type { TrendDelta } from "../model/trend";
import { TrendChip } from "./TrendChip";

type Props = { breakdown: HealthBreakdown; trend: TrendDelta };

export function ScoreTile({ breakdown, trend }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
            Health Score
          </span>
          <Badge tone="accent">live</Badge>
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          weighted
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[44px] font-semibold leading-none tabular-nums tracking-tight text-[var(--color-fg)]">
          {breakdown.weightedScore}
        </span>
        <span className="font-mono text-[13px] text-[var(--color-fg-subtle)]">
          / 100
        </span>
      </div>

      <TrendChip trend={trend} />

      <div className="mt-1 flex flex-col gap-0.5 border-t border-[var(--color-border)] pt-2 font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
        <div className="flex justify-between">
          <span>단순 평균 (참고)</span>
          <span className="tabular-nums text-[var(--color-fg-muted)]">
            {breakdown.unweightedScore} / 100
          </span>
        </div>
        <div className="flex justify-between">
          <span>가중치 규칙</span>
          <span className="text-[var(--color-fg-muted)]">critical × 3</span>
        </div>
      </div>
    </div>
  );
}
