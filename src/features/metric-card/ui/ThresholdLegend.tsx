import type { MetricSpec } from "@/entities/evaluation";

type Props = { spec: MetricSpec };

export function ThresholdLegend({ spec }: Props) {
  const { direction, threshold } = spec;
  const items =
    direction === "lower-better"
      ? [
          { tone: "bg-success-500", op: "<", value: threshold.good, label: "우수" },
          { tone: "bg-warning-500", op: "<", value: threshold.ok, label: "보통" },
          { tone: "bg-critical-500", op: "≥", value: threshold.ok, label: "미흡" },
        ]
      : [
          { tone: "bg-success-500", op: ">", value: threshold.good, label: "우수" },
          { tone: "bg-warning-500", op: ">", value: threshold.ok, label: "보통" },
          { tone: "bg-critical-500", op: "≤", value: threshold.ok, label: "미흡" },
        ];

  return (
    <div className="flex items-center gap-3 font-mono text-[10.5px] text-[var(--color-fg-muted)]">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${it.tone}`} aria-hidden />
          <span className="text-[var(--color-fg-subtle)]">{it.label}</span>
          <span className="tabular-nums text-[var(--color-fg)]">
            {it.op} {it.value}
          </span>
        </div>
      ))}
    </div>
  );
}
