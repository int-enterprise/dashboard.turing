"use client";

import { useState } from "react";

type Props = {
  content: React.ReactNode;
  side?: "top" | "bottom";
};

export function InfoTooltip({ content, side = "top" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="자세히"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[10px] font-medium leading-none text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)]"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className={
            "absolute z-20 w-64 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-[11.5px] leading-relaxed text-[var(--color-fg-muted)] shadow-lg " +
            (side === "top"
              ? "bottom-full left-1/2 mb-2 -translate-x-1/2"
              : "top-full left-1/2 mt-2 -translate-x-1/2")
          }
        >
          {content}
        </span>
      )}
    </span>
  );
}
