import type { EvaluationAverages, EvaluationItem } from "@/entities/evaluation";
import { buildBreakdown } from "../model/aggregate";
import { computeTrend } from "../model/trend";
import { ScoreTile } from "./ScoreTile";
import { SloBlock } from "./SloBlock";
import { CriticalAlerts } from "./CriticalAlerts";

type Props = {
  averages: EvaluationAverages;
  items: EvaluationItem[];
};

export function HealthScoreBanner({ averages, items }: Props) {
  const breakdown = buildBreakdown(averages);
  const trend = computeTrend(items);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_1fr_1.4fr]">
      <ScoreTile breakdown={breakdown} trend={trend} />
      <SloBlock passing={breakdown.slo.passing} total={breakdown.slo.total} />
      <CriticalAlerts critical={breakdown.critical} />
    </div>
  );
}
