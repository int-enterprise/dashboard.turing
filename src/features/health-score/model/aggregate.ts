import {
  METRICS,
  gradeValue,
  pickMetric,
  type EvaluationAverages,
  type EvaluationMetrics,
  type Grade,
  type MetricGroup,
  type MetricKey,
  type MetricSpec,
} from "@/entities/evaluation";

export const CRITICAL_METRIC_KEYS = new Set<MetricKey>([
  "pii_protection",
  "hallucination_ratio",
  "mdr",
  "summary_mdr",
]);

const CRITICAL_WEIGHT = 3;
const DEFAULT_WEIGHT = 1;

export function weightOf(spec: MetricSpec): number {
  return CRITICAL_METRIC_KEYS.has(spec.key) ? CRITICAL_WEIGHT : DEFAULT_WEIGHT;
}

export function isCritical(spec: MetricSpec): boolean {
  return CRITICAL_METRIC_KEYS.has(spec.key);
}

const GRADE_VALUE: Record<Grade, number> = { good: 1, ok: 0.5, bad: 0 };

export type MetricGradeEntry = {
  spec: MetricSpec;
  value: number;
  grade: Grade;
};

export type GradeCounts = Record<Grade, number>;

export type GroupBreakdown = {
  group: MetricGroup;
  entries: MetricGradeEntry[];
  counts: GradeCounts;
  score: number;
};

function emptyCounts(): GradeCounts {
  return { good: 0, ok: 0, bad: 0 };
}

export function weightedScoreFromEntries(entries: MetricGradeEntry[]): number {
  if (entries.length === 0) return 0;
  let sumW = 0;
  let sumVW = 0;
  for (const e of entries) {
    const w = weightOf(e.spec);
    sumW += w;
    sumVW += w * GRADE_VALUE[e.grade];
  }
  return Math.round((sumVW / sumW) * 100);
}

export function unweightedScoreFromEntries(entries: MetricGradeEntry[]): number {
  if (entries.length === 0) return 0;
  let s = 0;
  for (const e of entries) s += GRADE_VALUE[e.grade];
  return Math.round((s / entries.length) * 100);
}

export function entriesFromMetrics(metrics: EvaluationMetrics): MetricGradeEntry[] {
  return METRICS.map((spec) => {
    const value = pickMetric(metrics, spec.key);
    return { spec, value, grade: gradeValue(spec, value) };
  });
}

export type HealthBreakdown = {
  entries: MetricGradeEntry[];
  weightedScore: number;
  unweightedScore: number;
  overall: GradeCounts;
  groups: Record<MetricGroup, GroupBreakdown>;
  slo: { passing: number; total: number };
  critical: {
    entries: MetricGradeEntry[];
    counts: GradeCounts;
    alerts: MetricGradeEntry[];
  };
};

export function buildBreakdown(averages: EvaluationAverages): HealthBreakdown {
  const entries = entriesFromMetrics(averages);
  const overall = emptyCounts();
  const groups: Record<MetricGroup, GroupBreakdown> = {
    performance: { group: "performance", entries: [], counts: emptyCounts(), score: 0 },
    stt: { group: "stt", entries: [], counts: emptyCounts(), score: 0 },
    summary: { group: "summary", entries: [], counts: emptyCounts(), score: 0 },
  };

  for (const entry of entries) {
    overall[entry.grade]++;
    const g = groups[entry.spec.group];
    g.entries.push(entry);
    g.counts[entry.grade]++;
  }
  for (const g of Object.values(groups)) g.score = weightedScoreFromEntries(g.entries);

  const critEntries = entries.filter((e) => isCritical(e.spec));
  const critCounts = emptyCounts();
  for (const e of critEntries) critCounts[e.grade]++;
  const alerts = critEntries
    .filter((e) => e.grade !== "good")
    .sort((a, b) => (a.grade === "bad" ? -1 : b.grade === "bad" ? 1 : 0));

  return {
    entries,
    weightedScore: weightedScoreFromEntries(entries),
    unweightedScore: unweightedScoreFromEntries(entries),
    overall,
    groups,
    slo: { passing: overall.good, total: entries.length },
    critical: { entries: critEntries, counts: critCounts, alerts },
  };
}

export const GROUP_LABEL: Record<MetricGroup, string> = {
  performance: "Performance",
  stt: "STT",
  summary: "Summary",
};
