import { formatRatio } from "@/shared/lib/format";
import { GRADE_LABEL, GRADE_TONE } from "@/entities/evaluation";
import type { HealthBreakdown } from "../model/aggregate";

type Props = { critical: HealthBreakdown["critical"] };

export function CriticalAlerts({ critical }: Props) {
  const allGood = critical.alerts.length === 0;
  const badCount = critical.counts.bad;

  return (
    <div
      className={
        "flex flex-col gap-2 rounded border p-4 " +
        (badCount > 0
          ? "border-critical-300 bg-critical-100/50 dark:border-critical-700 dark:bg-critical-900/20"
          : critical.counts.ok > 0
            ? "border-warning-300 bg-warning-100/50 dark:border-warning-700 dark:bg-warning-900/20"
            : "border-[var(--color-border)] bg-[var(--color-surface-2)]")
      }
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
          Critical 지표 ({critical.entries.length})
        </span>
        <span className="font-mono text-[10.5px] tabular-nums text-[var(--color-fg-subtle)]">
          × 3 weight
        </span>
      </div>

      <p className="text-[11.5px] leading-relaxed text-[var(--color-fg-muted)]">
        보안·신뢰성에 직결되는 지표 — 환각·개인정보·의료용어 왜곡
      </p>

      {allGood ? (
        <p className="font-mono text-[11.5px] text-success-600 dark:text-success-300">
          ✓ 모든 크리티컬 지표가 우수 기준을 충족합니다
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {critical.alerts.map((e) => {
            const tone = GRADE_TONE[e.grade];
            return (
              <li
                key={e.spec.key}
                className="flex items-center justify-between gap-2 text-[12px]"
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.bar}`} />
                  <span className="truncate text-[var(--color-fg)]">
                    {e.spec.label}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 font-mono">
                  <span className="tabular-nums text-[var(--color-fg-muted)]">
                    {formatRatio(e.value)}
                  </span>
                  <span className={`${tone.fg} text-[10.5px] font-semibold uppercase tracking-wider`}>
                    {GRADE_LABEL[e.grade]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
