import { cn } from "../lib/cn";

type Tone = "default" | "accent" | "navy" | "neutral";

const TONE: Record<Tone, string> = {
  default:
    "bg-base-300 text-base-900 border border-base-500 dark:bg-[var(--color-surface-muted)] dark:text-[var(--color-fg-muted)] dark:border-[var(--color-border-strong)]",
  accent:
    "bg-accent-100 text-accent-800 border border-accent-300 dark:bg-accent-900/30 dark:text-accent-300 dark:border-accent-700",
  navy:
    "bg-secondary1-100 text-secondary1-800 border border-secondary1-300 dark:bg-secondary1-900/40 dark:text-secondary3-300 dark:border-secondary1-700",
  neutral:
    "bg-transparent text-[var(--color-fg-subtle)] border border-[var(--color-border-strong)]",
};

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

export function Badge({ children, tone = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 font-mono text-[10.5px] uppercase tracking-wider",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
