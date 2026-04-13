"use client";

import { useEffect } from "react";
import { METRICS, pickMetric, type EvaluationItem } from "@/entities/evaluation";
import { MetricCard } from "@/features/metric-card/ui/MetricCard";
import { formatDateTime, formatDuration } from "@/shared/lib/format";

type Props = {
  item: EvaluationItem | null;
  onClose: () => void;
};

export function EvaluationDrawer({ item, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (item) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-30 flex">
      <div
        className="flex-1 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden
      />
      <aside className="flex w-full max-w-[720px] flex-col overflow-hidden border-l border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-fg-subtle)]">
                evaluation
              </span>
              <span className="font-mono text-[11px] text-[var(--color-fg-muted)]">
                #{item.id}
              </span>
            </div>
            <h2 className="truncate font-mono text-[13.5px] font-semibold text-[var(--color-fg)]">
              {item.job_id}
            </h2>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] text-[var(--color-fg-muted)]">
              <span>{item.audio_filename}</span>
              <span>·</span>
              <span>{formatDuration(item.audio_duration)}</span>
              <span>·</span>
              <span>{item.language ?? "—"}</span>
              <span>·</span>
              <span>{formatDateTime(item.created_at)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-fg)]"
            aria-label="닫기"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-auto p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {METRICS.map((spec) => (
              <MetricCard
                key={spec.key}
                spec={spec}
                value={pickMetric(item.metrics, spec.key)}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
