"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/shared/lib/cn";

const INTERVALS = [
  { label: "off", value: 0 },
  { label: "30s", value: 30_000 },
  { label: "1m", value: 60_000 },
  { label: "5m", value: 300_000 },
];

export function RefreshControl() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [interval, setInterval] = useState(0);
  const [lastAt, setLastAt] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function doRefresh() {
    start(() => {
      router.refresh();
      setLastAt(new Date());
    });
  }

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (interval === 0) return;
    timerRef.current = setTimeout(function tick() {
      doRefresh();
      timerRef.current = setTimeout(tick, interval);
    }, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return (
    <div className="flex items-center gap-1 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 font-mono text-[11px]">
      <button
        type="button"
        onClick={doRefresh}
        disabled={pending}
        className="inline-flex h-6 items-center gap-1 rounded px-2 text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-fg)] disabled:opacity-60"
        aria-label="refresh"
      >
        <RefreshIcon spinning={pending} />
        <span className="text-[10.5px] uppercase tracking-wider">
          {pending ? "…" : "refresh"}
        </span>
      </button>

      <div className="mx-0.5 h-4 w-px bg-[var(--color-border)]" />

      {INTERVALS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setInterval(o.value)}
          className={cn(
            "inline-flex h-6 items-center rounded px-2 text-[10.5px] uppercase tracking-wider",
            interval === o.value
              ? "bg-[var(--color-surface-muted)] text-[var(--color-fg)]"
              : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)]",
          )}
        >
          {o.label}
        </button>
      ))}

      {lastAt && (
        <span className="ml-1 pr-1.5 text-[10.5px] text-[var(--color-fg-subtle)]">
          {formatRel(lastAt)}
        </span>
      )}
    </div>
  );
}

function formatRel(d: Date): string {
  const s = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  return `${m}m ago`;
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(spinning && "animate-spin")}
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
