import type { EvaluationAverages } from "@/entities/evaluation";
import { METRICS, pickMetric } from "@/entities/evaluation";
import { MetricCard } from "@/features/metric-card/ui/MetricCard";

type Props = { averages: EvaluationAverages };

export function MetricGrid({ averages }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="metrics · averages" count={METRICS.length} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {METRICS.map((spec) => {
          const sampleCount =
            spec.group === "stt"
              ? averages.sample_count.stt
              : spec.group === "summary"
                ? averages.sample_count.summary
                : undefined;
          return (
            <MetricCard
              key={spec.key}
              spec={spec}
              value={pickMetric(averages, spec.key)}
              samples={sampleCount}
            />
          );
        })}
      </div>
    </section>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-[3px] rounded-sm bg-accent-500" />
        <span className="font-mono text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg)]">
          {title}
        </span>
      </div>
      <span className="font-mono text-[11px] font-medium text-[var(--color-fg-muted)]">
        {count} items
      </span>
    </div>
  );
}
