"use client";

import { useActionState } from "react";
import { loginAction } from "../api/login";
import type { LoginState } from "../model/schema";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

const INITIAL: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="username" htmlFor="username">
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          disabled={pending}
          placeholder="int"
        />
      </Field>

      <Field label="password" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          placeholder="••••••••"
        />
      </Field>

      {state.error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2"
        >
          <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-900 dark:bg-accent-400" />
          <p className="font-mono text-[11.5px] text-[var(--color-fg-muted)]">
            {state.error}
          </p>
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
        {pending ? "인증 중…" : "로그인"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
