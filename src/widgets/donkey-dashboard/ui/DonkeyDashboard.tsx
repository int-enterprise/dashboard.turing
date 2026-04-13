import type { EvaluationsResponse } from "@/entities/evaluation";
import type { ProjectMeta } from "@/shared/config/projects";
import { HealthScoreBanner } from "@/features/health-score/ui/HealthScoreBanner";
import { EvaluationsTable } from "@/features/evaluations-table/ui/EvaluationsTable";
import { DashboardToolbar } from "./DashboardToolbar";
import { MetricGrid } from "./MetricGrid";
import { TrendSection } from "./TrendSection";

type Props = {
  project: ProjectMeta;
  data: EvaluationsResponse;
};

export function DonkeyDashboard({ project, data }: Props) {
  return (
    <div className="flex flex-col">
      <DashboardToolbar projectName={project.name} total={data.total} />

      <div className="flex flex-col gap-5 p-5">
        <HealthScoreBanner averages={data.averages} items={data.items} />

        <MetricGrid averages={data.averages} />

        <TrendSection items={data.items} />

        <EvaluationsTable items={data.items} />
      </div>
    </div>
  );
}
