import type { EvaluationItem, MetricKey } from "@/entities/evaluation";
import { METRIC_MAP, toTrendPoints } from "@/entities/evaluation";
import { TrendLineChart } from "./TrendLineChart";

type Props = {
  metricKey: MetricKey;
  items: EvaluationItem[];
};

export function TrendPanel({ metricKey, items }: Props) {
  const spec = METRIC_MAP[metricKey];
  const data = toTrendPoints(items, metricKey);

  return (
    <div className="flex flex-col rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
            {spec.group}
          </span>
          <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
            /
          </span>
          <h4 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
            {spec.label}
          </h4>
          <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
            ({spec.key})
          </span>
        </div>
        <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
          {data.length} pts
        </span>
      </div>
      <div className="p-2">
        <TrendLineChart spec={spec} data={data} />
      </div>
    </div>
  );
}
