"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MetricSpec } from "@/entities/evaluation";

export type TrendPoint = {
  label: string;
  t: number;
  value: number;
  jobId: string;
};

type Props = {
  spec: MetricSpec;
  data: TrendPoint[];
  height?: number;
};

function computeDomain(values: number[]): [number, number] {
  if (values.length === 0) return [0, 1];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const pad = range === 0 ? Math.max(Math.abs(max) * 0.1, 0.01) : range * 0.2;
  const lo = Math.max(0, min - pad);
  const hi = max + pad;
  return [Number(lo.toFixed(4)), Number(hi.toFixed(4))];
}

export function TrendLineChart({ spec, data, height = 180 }: Props) {
  const { threshold, direction } = spec;
  const [yMin, yMax] = computeDomain(data.map((d) => d.value));
  const showGood = threshold.good >= yMin && threshold.good <= yMax;
  const showOk = threshold.ok >= yMin && threshold.ok <= yMax;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid
            stroke="color-mix(in srgb, var(--color-fg) 6%, transparent)"
            strokeDasharray="2 4"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            stroke="var(--color-fg-subtle)"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}
            minTickGap={20}
          />
          <YAxis
            domain={[yMin, yMax]}
            stroke="var(--color-fg-subtle)"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}
            width={48}
            tickFormatter={(v: number) => v.toFixed(v < 1 ? 3 : 2)}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-border-strong)", strokeWidth: 1 }}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-strong)",
              borderRadius: 4,
              fontSize: 11.5,
              padding: "6px 10px",
            }}
            labelStyle={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-fg-subtle)",
              marginBottom: 4,
            }}
            formatter={(v) => [
              typeof v === "number" ? v.toFixed(4) : String(v),
              spec.label,
            ]}
          />
          {showGood && (
            <ReferenceLine
              y={threshold.good}
              stroke="var(--color-success-500)"
              strokeDasharray="3 3"
              strokeOpacity={0.7}
              label={{
                value: `우수 ${direction === "lower-better" ? "<" : ">"} ${threshold.good}`,
                position: "insideTopRight",
                fill: "var(--color-success-500)",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
            />
          )}
          {showOk && (
            <ReferenceLine
              y={threshold.ok}
              stroke="var(--color-warning-500)"
              strokeDasharray="3 3"
              strokeOpacity={0.6}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-accent-500)"
            strokeWidth={1.75}
            dot={{ r: 3, fill: "var(--color-accent-500)", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
