import type { MetricSpec } from "@/entities/evaluation";
import { gradeValue } from "@/entities/evaluation";
import { formatRatio } from "@/shared/lib/format";
import { InfoTooltip } from "@/shared/ui/InfoTooltip";
import { MetricGauge } from "./MetricGauge";
import { GradeBadge } from "./GradeBadge";
import { ThresholdLegend } from "./ThresholdLegend";

type Props = {
  spec: MetricSpec;
  value: number;
  samples?: number;
};

export function MetricCard({ spec, value, samples }: Props) {
  const grade = gradeValue(spec, value);

  return (
    <div className="flex flex-col gap-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              {spec.group}
            </span>
            <span className="text-[var(--color-fg-subtle)]" aria-hidden>
              ·
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)]">
              {spec.key}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-[13.5px] font-semibold tracking-tight text-[var(--color-fg)]">
              {spec.label}
            </h3>
            <InfoTooltip
              content={
                <>
                  <div className="mb-1 font-semibold text-[var(--color-fg)]">
                    {spec.summary}
                  </div>
                  <div>{spec.description}</div>
                  <div className="mt-2 font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
                    good / ok / bad 기준: {spec.threshold.good} · {spec.threshold.ok}
                  </div>
                </>
              }
            />
          </div>
          <p className="text-[11.5px] leading-relaxed text-[var(--color-fg-muted)]">
            {spec.summary}
          </p>
        </div>
        <GradeBadge grade={grade} />
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[26px] font-semibold tabular-nums tracking-tight text-[var(--color-fg)]">
            {formatRatio(value)}
          </span>
          {samples != null && (
            <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
              n={samples}
            </span>
          )}
        </div>
      </div>

      <MetricGauge spec={spec} value={value} />

      <div className="border-t border-[var(--color-border)] pt-2">
        <ThresholdLegend spec={spec} />
      </div>
    </div>
  );
}
