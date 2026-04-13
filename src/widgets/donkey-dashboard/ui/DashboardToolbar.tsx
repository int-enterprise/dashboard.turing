import { Badge } from "@/shared/ui/Badge";
import { RefreshControl } from "@/features/auto-refresh/ui/RefreshControl";

type Props = {
  projectName: string;
  total: number;
};

export function DashboardToolbar({ projectName, total }: Props) {
  return (
    <div className="flex h-11 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
      <div className="flex items-center gap-3">
        <h1 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
          {projectName}
        </h1>
        <Badge tone="navy">project</Badge>
        <Badge tone="neutral">{total} evaluations</Badge>
      </div>
      <div className="flex items-center gap-2">
        <RefreshControl />
      </div>
    </div>
  );
}
