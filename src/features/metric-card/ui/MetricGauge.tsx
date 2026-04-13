import type { MetricSpec } from "@/entities/evaluation";
import { GRADE_TONE, gradeValue } from "@/entities/evaluation";
import { cn } from "@/shared/lib/cn";

type Props = {
  spec: MetricSpec;
  value: number;
};

export function MetricGauge({ spec, value }: Props) {
  const { displayMin, displayMax, threshold, direction } = spec;
  const clampedValue = Math.max(displayMin, Math.min(displayMax, value));
  const span = displayMax - displayMin || 1;
  const pct = ((clampedValue - displayMin) / span) * 100;
  const goodPct = ((threshold.good - displayMin) / span) * 100;
  const okPct = ((threshold.ok - displayMin) / span) * 100;
  const grade = gradeValue(spec, value);
  const tone = GRADE_TONE[grade];

  const zones =
    direction === "lower-better"
      ? [
          { from: 0, to: goodPct, tone: "bg-success-500/70" },
          { from: goodPct, to: okPct, tone: "bg-warning-500/70" },
          { from: okPct, to: 100, tone: "bg-critical-500/70" },
        ]
      : [
          { from: 0, to: okPct, tone: "bg-critical-500/70" },
          { from: okPct, to: goodPct, tone: "bg-warning-500/70" },
          { from: goodPct, to: 100, tone: "bg-success-500/70" },
        ];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative h-2.5 w-full rounded-full bg-[var(--color-surface-muted)]">
        {zones.map((z, i) => (
          <div
            key={i}
            className={cn(
              "absolute top-0 h-full",
              z.tone,
              i === 0 && "rounded-l-full",
              i === zones.length - 1 && "rounded-r-full",
            )}
            style={{ left: `${z.from}%`, width: `${Math.max(0, z.to - z.from)}%` }}
            aria-hidden
          />
        ))}
        <div
          className={cn(
            "absolute top-1/2 h-[18px] w-[5px] -translate-y-1/2 rounded-sm border-2 border-[var(--color-surface)] shadow-md ring-1",
            tone.bar,
            grade === "good"
              ? "ring-success-700/40"
              : grade === "ok"
                ? "ring-warning-700/40"
                : "ring-critical-700/40",
          )}
          style={{ left: `calc(${pct}% - 2.5px)` }}
          aria-hidden
        />
      </div>

      <div className="flex items-center justify-between font-mono text-[10.5px] font-medium text-[var(--color-fg-muted)]">
        <span>{displayMin}</span>
        <span className="tabular-nums">
          {direction === "lower-better" ? "↓ lower better" : "↑ higher better"}
        </span>
        <span>
          {displayMax}
          {spec.unit === "percent" ? "%" : ""}
        </span>
      </div>
    </div>
  );
}
