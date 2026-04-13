"use client";

import { METRICS, gradeValue, pickMetric, type EvaluationItem } from "@/entities/evaluation";
import { formatDateTime, formatDuration } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";

type Props = {
  item: EvaluationItem;
  onSelect: (item: EvaluationItem) => void;
  index: number;
};

export function EvaluationRow({ item, onSelect, index }: Props) {
  const counts = { good: 0, ok: 0, bad: 0 };
  for (const spec of METRICS) {
    const v = pickMetric(item.metrics, spec.key);
    counts[gradeValue(spec, v)]++;
  }

  return (
    <tr
      onClick={() => onSelect(item)}
      className={cn(
        "cursor-pointer border-b border-[var(--color-border)] last:border-0 transition-colors hover:bg-[var(--color-surface-muted)]/60",
        index % 2 ? "bg-[var(--color-surface-2)]/40" : "",
      )}
    >
      <td className="px-4 py-2.5 font-mono text-[11.5px] tabular-nums text-[var(--color-fg-muted)]">
        #{item.id}
      </td>
      <td className="px-4 py-2.5 font-mono text-[11.5px] text-[var(--color-fg)]">
        {item.job_id.slice(0, 8)}
        <span className="text-[var(--color-fg-subtle)]">…</span>
      </td>
      <td className="px-4 py-2.5 font-mono text-[11.5px] text-[var(--color-fg-muted)]">
        {item.audio_filename.length > 28
          ? item.audio_filename.slice(0, 28) + "…"
          : item.audio_filename}
      </td>
      <td className="px-4 py-2.5 text-right font-mono text-[11.5px] tabular-nums text-[var(--color-fg-muted)]">
        {formatDuration(item.audio_duration)}
      </td>
      <td className="px-4 py-2.5 font-mono text-[11px] uppercase text-[var(--color-fg-subtle)]">
        {item.language ?? "—"}
      </td>
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-0.5">
          <span className="inline-flex min-w-[20px] items-center justify-center rounded bg-success-500/15 px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-success-600 dark:text-success-300">
            {counts.good}
          </span>
          <span className="inline-flex min-w-[20px] items-center justify-center rounded bg-warning-500/15 px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-warning-600 dark:text-warning-300">
            {counts.ok}
          </span>
          <span className="inline-flex min-w-[20px] items-center justify-center rounded bg-critical-500/15 px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums text-critical-600 dark:text-critical-300">
            {counts.bad}
          </span>
        </div>
      </td>
      <td className="px-4 py-2.5 font-mono text-[11.5px] text-[var(--color-fg-muted)]">
        {formatDateTime(item.created_at)}
      </td>
    </tr>
  );
}
