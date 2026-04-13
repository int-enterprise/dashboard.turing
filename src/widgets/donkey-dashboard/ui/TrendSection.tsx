import type { EvaluationItem, MetricKey } from "@/entities/evaluation";
import { TrendPanel } from "@/features/metric-trend/ui/TrendPanel";

type Props = { items: EvaluationItem[] };

const FEATURED_TRENDS: MetricKey[] = [
  "processing_velocity",
  "stt_velocity",
  "summarization_velocity",
  "uer",
  "mdr",
  "hallucination_ratio",
  "ssr",
  "mir",
  "ssa",
];

export function TrendSection({ items }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-[3px] rounded-sm bg-accent-500" />
          <span className="font-mono text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg)]">
            trends · per evaluation
          </span>
        </div>
        <span className="font-mono text-[11px] font-medium text-[var(--color-fg-muted)]">
          {items.length} samples
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {FEATURED_TRENDS.map((key) => (
          <TrendPanel key={key} metricKey={key} items={items} />
        ))}
      </div>
    </section>
  );
}
