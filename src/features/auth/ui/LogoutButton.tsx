"use client";

import { useTransition } from "react";
import { logoutAction } from "../api/logout";

export function LogoutButton() {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => logoutAction())}
      className="inline-flex h-7 items-center rounded px-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-fg)] disabled:opacity-60"
    >
      {pending ? "signing out…" : "sign out"}
    </button>
  );
}
