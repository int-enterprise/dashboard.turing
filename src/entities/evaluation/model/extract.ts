import type { EvaluationItem, EvaluationMetrics } from "./types";
import type { MetricKey } from "./metrics-spec";

export function pickMetric(metrics: EvaluationMetrics, key: MetricKey): number {
  switch (key) {
    case "processing_velocity":
      return metrics.processing_velocity;
    case "stt_velocity":
    case "uer":
    case "pii_protection":
    case "mmr":
    case "mdr":
    case "diarization_accuracy":
    case "redundancy_ratio":
      return metrics.stt[key];
    case "summarization_velocity":
    case "hallucination_ratio":
    case "ssr":
    case "icr":
    case "mir":
    case "ssa":
      return metrics.summary[key];
    case "summary_mdr":
      return metrics.summary.summary_mdr;
  }
}

export function toTrendPoints(items: EvaluationItem[], key: MetricKey) {
  return [...items]
    .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
    .map((it) => ({
      t: new Date(it.created_at).getTime(),
      label: new Date(it.created_at).toLocaleString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      jobId: it.job_id,
      value: pickMetric(it.metrics, key),
    }));
}
