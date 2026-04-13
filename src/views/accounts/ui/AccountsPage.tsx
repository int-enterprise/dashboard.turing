import { listIamUsers } from "@/entities/user";
import { AccountTable } from "@/features/account-management/ui/AccountTable";
import { CreateAccountForm } from "@/features/account-management/ui/CreateAccountForm";
import { Badge } from "@/shared/ui/Badge";

export async function AccountsPage() {
  const users = await listIamUsers();

  return (
    <div className="flex flex-col">
      <div className="flex h-11 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
            계정 관리
          </h1>
          <Badge tone="accent">root only</Badge>
          <Badge tone="neutral">{users.length} iam</Badge>
        </div>
        <span className="font-mono text-[11px] text-[var(--color-fg-subtle)]">
          IAM account provisioning
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <CreateAccountForm />
        <AccountTable users={users} />
      </div>
    </div>
  );
}
