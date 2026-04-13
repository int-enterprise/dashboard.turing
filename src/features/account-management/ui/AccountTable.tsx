import type { PublicUser } from "@/entities/user";
import { DeleteAccountButton } from "./DeleteAccountButton";
import { ResetPasswordForm } from "./ResetPasswordForm";

type Props = { users: PublicUser[] };

export function AccountTable({ users }: Props) {
  return (
    <div className="overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          iam accounts
        </h3>
        <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
          {users.length} rows
        </span>
      </div>

      {users.length === 0 ? (
        <div className="flex items-center gap-2 px-4 py-6 font-mono text-[12px] text-[var(--color-fg-subtle)]">
          <span className="h-1 w-1 rounded-full bg-[var(--color-fg-subtle)]" />
          등록된 IAM 계정이 없습니다
        </div>
      ) : (
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              <th className="px-4 py-2 text-left font-medium">username</th>
              <th className="px-4 py-2 text-left font-medium">id</th>
              <th className="px-4 py-2 text-left font-medium">created</th>
              <th className="px-4 py-2 text-left font-medium">reset password</th>
              <th className="px-4 py-2 text-right font-medium">actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={
                  "border-b border-[var(--color-border)] last:border-0 " +
                  (i % 2 ? "bg-[var(--color-surface-2)]/40" : "")
                }
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--color-surface-muted)] font-mono text-[10px] font-semibold text-[var(--color-fg-muted)]">
                      {u.username.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-mono text-[var(--color-fg)]">
                      {u.username}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-[var(--color-fg-subtle)]">
                  {u.id.slice(0, 12)}…
                </td>
                <td className="px-4 py-2.5 font-mono text-[11.5px] text-[var(--color-fg-muted)]">
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(u.createdAt)}
                </td>
                <td className="px-4 py-2.5">
                  <ResetPasswordForm userId={u.id} />
                </td>
                <td className="px-4 py-2.5 text-right">
                  <DeleteAccountButton userId={u.id} username={u.username} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
