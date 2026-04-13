import "server-only";
import { donkeyClient } from "./client";
import type {
  EvaluationsResponse,
  EvaluationQuery,
} from "@/entities/evaluation";

function toSearchParams(q: EvaluationQuery): Record<string, string> {
  const params: Record<string, string> = {};
  if (q.page != null) params.page = String(q.page);
  if (q.size != null) params.size = String(q.size);
  if (q.from) params.from = q.from;
  if (q.to) params.to = q.to;
  if (q.language) params.language = q.language;
  if (q.specialty) params.specialty = q.specialty;
  if (q.job_id) params.job_id = q.job_id;
  return params;
}

export async function listEvaluations(
  q: EvaluationQuery = {},
): Promise<EvaluationsResponse> {
  const searchParams = toSearchParams({ page: 1, size: 50, ...q });
  return donkeyClient().get("/evaluations", { searchParams }).json<EvaluationsResponse>();
}
