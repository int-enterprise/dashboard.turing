import type { EvaluationItem, EvaluationMetrics } from "@/entities/evaluation";
import { entriesFromMetrics, weightedScoreFromEntries } from "./aggregate";

function averageMetrics(items: EvaluationItem[]): EvaluationMetrics | null {
  if (items.length === 0) return null;
  const acc = {
    processing_velocity: 0,
    stt: {
      stt_velocity: 0,
      uer: 0,
      pii_protection: 0,
      mmr: 0,
      mdr: 0,
      diarization_accuracy: 0,
      redundancy_ratio: 0,
    },
    summary: {
      summarization_velocity: 0,
      hallucination_ratio: 0,
      ssr: 0,
      icr: 0,
      mir: 0,
      summary_mdr: 0,
      ssa: 0,
    },
  };
  for (const it of items) {
    acc.processing_velocity += it.metrics.processing_velocity;
    for (const k of Object.keys(acc.stt) as (keyof typeof acc.stt)[]) {
      acc.stt[k] += it.metrics.stt[k];
    }
    for (const k of Object.keys(acc.summary) as (keyof typeof acc.summary)[]) {
      acc.summary[k] += it.metrics.summary[k];
    }
  }
  const n = items.length;
  acc.processing_velocity /= n;
  for (const k of Object.keys(acc.stt) as (keyof typeof acc.stt)[]) {
    acc.stt[k] /= n;
  }
  for (const k of Object.keys(acc.summary) as (keyof typeof acc.summary)[]) {
    acc.summary[k] /= n;
  }
  return acc;
}

export type TrendDelta = {
  currentScore: number;
  previousScore: number | null;
  delta: number | null;
  currentCount: number;
  previousCount: number;
};

/**
 * 시간순 정렬 후 앞쪽(더 오래된) 절반을 previous, 뒤쪽 절반을 current로 가중 점수 비교.
 * 데이터가 2건 미만이면 비교 없음.
 */
export function computeTrend(items: EvaluationItem[]): TrendDelta {
  const sorted = [...items].sort(
    (a, b) => +new Date(a.created_at) - +new Date(b.created_at),
  );
  if (sorted.length < 2) {
    return {
      currentScore: 0,
      previousScore: null,
      delta: null,
      currentCount: sorted.length,
      previousCount: 0,
    };
  }
  const mid = Math.floor(sorted.length / 2);
  const previous = sorted.slice(0, mid);
  const current = sorted.slice(mid);

  const prevMetrics = averageMetrics(previous);
  const curMetrics = averageMetrics(current);
  const prevScore = prevMetrics
    ? weightedScoreFromEntries(entriesFromMetrics(prevMetrics))
    : null;
  const curScore = curMetrics
    ? weightedScoreFromEntries(entriesFromMetrics(curMetrics))
    : 0;

  return {
    currentScore: curScore,
    previousScore: prevScore,
    delta: prevScore != null ? curScore - prevScore : null,
    currentCount: current.length,
    previousCount: previous.length,
  };
}
