"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePasswordAction } from "../api/actions";
import type { AccountActionState } from "../model/schema";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

const INITIAL: AccountActionState = {};

type Props = { userId: string };

export function ResetPasswordForm({ userId }: Props) {
  const [state, formAction, pending] = useActionState(updatePasswordAction, INITIAL);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state.ok]);

  return (
    <form ref={ref} action={formAction} className="flex items-center gap-1.5">
      <input type="hidden" name="userId" value={userId} />
      <Input
        name="password"
        type="password"
        placeholder="new password"
        className="h-7 w-40 text-[12px]"
        required
        disabled={pending}
      />
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>
        {pending ? "…" : "reset"}
      </Button>
      {state.error && (
        <span className="font-mono text-[10.5px] text-[var(--color-fg-muted)]">
          ✗
        </span>
      )}
      {state.ok && (
        <span className="font-mono text-[10.5px] text-accent-600 dark:text-accent-400">
          ✓
        </span>
      )}
    </form>
  );
}
