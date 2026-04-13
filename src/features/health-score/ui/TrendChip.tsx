import type { TrendDelta } from "../model/trend";
import { cn } from "@/shared/lib/cn";

type Props = { trend: TrendDelta };

export function TrendChip({ trend }: Props) {
  if (trend.delta == null) {
    return (
      <span className="font-mono text-[11px] text-[var(--color-fg-subtle)]">
        비교 데이터 없음
      </span>
    );
  }

  const up = trend.delta > 0;
  const down = trend.delta < 0;
  const flat = !up && !down;

  const tone = up
    ? "text-success-600 dark:text-success-300"
    : down
      ? "text-critical-600 dark:text-critical-300"
      : "text-[var(--color-fg-muted)]";

  const arrow = up ? "↑" : down ? "↓" : "→";
  const sign = trend.delta > 0 ? "+" : "";

  return (
    <div className="flex items-center gap-2 font-mono text-[11.5px]">
      <span className={cn("inline-flex items-center gap-1 tabular-nums", tone)}>
        <span className="text-[13px] leading-none">{arrow}</span>
        <span className="font-semibold">
          {sign}
          {trend.delta.toFixed(1)}
        </span>
      </span>
      <span className="text-[var(--color-fg-subtle)]">
        vs 이전 {trend.previousCount}건 ({flat ? "변동 없음" : up ? "개선" : "저하"})
      </span>
    </div>
  );
}
