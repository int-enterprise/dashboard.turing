import { METRIC_MAP, type MetricKey, type MetricSpec } from "./metrics-spec";

export type Grade = "good" | "ok" | "bad";

export function gradeValue(spec: MetricSpec, value: number): Grade {
  const { direction, threshold } = spec;
  if (direction === "lower-better") {
    if (value < threshold.good) return "good";
    if (value < threshold.ok) return "ok";
    return "bad";
  }
  if (value > threshold.good) return "good";
  if (value > threshold.ok) return "ok";
  return "bad";
}

export function gradeByKey(key: MetricKey, value: number): Grade {
  return gradeValue(METRIC_MAP[key], value);
}

export const GRADE_LABEL: Record<Grade, string> = {
  good: "우수",
  ok: "보통",
  bad: "미흡",
};

export const GRADE_TONE: Record<Grade, { fg: string; bg: string; border: string; bar: string }> = {
  good: {
    fg: "text-success-600 dark:text-success-300",
    bg: "bg-success-100 dark:bg-success-900/40",
    border: "border-success-300 dark:border-success-700",
    bar: "bg-success-500",
  },
  ok: {
    fg: "text-warning-600 dark:text-warning-300",
    bg: "bg-warning-100 dark:bg-warning-900/40",
    border: "border-warning-300 dark:border-warning-700",
    bar: "bg-warning-500",
  },
  bad: {
    fg: "text-critical-600 dark:text-critical-300",
    bg: "bg-critical-100 dark:bg-critical-900/40",
    border: "border-critical-300 dark:border-critical-700",
    bar: "bg-critical-500",
  },
};
