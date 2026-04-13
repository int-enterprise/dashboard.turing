import { notFound } from "next/navigation";
import { listEvaluations } from "@/features/donkey-api/api/evaluations";
import { DonkeyDashboard } from "@/widgets/donkey-dashboard/ui/DonkeyDashboard";
import { getProjectBySlug } from "@/shared/config/projects";
import { DashboardError } from "./DashboardError";

export async function DonkeyDashboardPage() {
  const project = getProjectBySlug("donkey");
  if (!project) notFound();

  try {
    const data = await listEvaluations({ page: 1, size: 50 });
    return <DonkeyDashboard project={project} data={data} />;
  } catch (error) {
    return <DashboardError project={project} error={error} />;
  }
}
