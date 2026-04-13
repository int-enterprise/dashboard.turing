"use client";

import { useActionState, useEffect, useRef } from "react";
import { createAccountAction } from "../api/actions";
import type { AccountActionState } from "../model/schema";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

const INITIAL: AccountActionState = {};

export function CreateAccountForm() {
  const [state, formAction, pending] = useActionState(createAccountAction, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          create iam account
        </h3>
        <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
          POST /admin/accounts
        </span>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto]">
        <Field label="username">
          <Input
            name="username"
            placeholder="john.doe"
            autoComplete="off"
            required
            disabled={pending}
          />
        </Field>
        <Field label="initial password">
          <Input
            name="password"
            type="password"
            placeholder="8자 이상"
            autoComplete="new-password"
            required
            disabled={pending}
          />
        </Field>
        <div className="flex items-end">
          <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "provisioning…" : "Provision"}
          </Button>
        </div>
      </div>

      {(state.error || state.ok) && (
        <div className="border-t border-[var(--color-border)] px-4 py-2 font-mono text-[11px]">
          {state.error && (
            <span className="text-[var(--color-fg-muted)]">✗ {state.error}</span>
          )}
          {state.ok && <span className="text-accent-600 dark:text-accent-400">✓ provisioned</span>}
        </div>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
        {label}
      </span>
      {children}
    </div>
  );
}
