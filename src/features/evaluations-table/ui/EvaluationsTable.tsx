"use client";

import { useState } from "react";
import type { EvaluationItem } from "@/entities/evaluation";
import { EvaluationRow } from "./EvaluationRow";
import { EvaluationDrawer } from "./EvaluationDrawer";

type Props = { items: EvaluationItem[] };

export function EvaluationsTable({ items }: Props) {
  const [selected, setSelected] = useState<EvaluationItem | null>(null);

  return (
    <>
      <div className="overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
              evaluations
            </h3>
            <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
              {items.length} rows
            </span>
          </div>
          <span className="font-mono text-[10.5px] text-[var(--color-fg-subtle)]">
            GET /evaluations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)] font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                <th className="px-4 py-2 text-left font-medium">id</th>
                <th className="px-4 py-2 text-left font-medium">job</th>
                <th className="px-4 py-2 text-left font-medium">audio</th>
                <th className="px-4 py-2 text-right font-medium">duration</th>
                <th className="px-4 py-2 text-left font-medium">lang</th>
                <th className="px-4 py-2 text-left font-medium">grades</th>
                <th className="px-4 py-2 text-left font-medium">created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <EvaluationRow
                  key={item.id}
                  item={item}
                  index={i}
                  onSelect={setSelected}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EvaluationDrawer item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
