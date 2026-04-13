import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary-900 text-base-100 hover:bg-primary-800 border border-primary-900 dark:bg-accent-500 dark:text-primary-900 dark:border-accent-500 dark:hover:bg-accent-400",
  secondary:
    "bg-base-100 text-primary-900 border border-base-500 hover:bg-base-200 dark:bg-[var(--color-surface-2)] dark:text-[var(--color-fg)] dark:border-[var(--color-border-strong)] dark:hover:bg-[var(--color-surface-muted)]",
  ghost:
    "bg-transparent text-[var(--color-fg-muted)] border border-transparent hover:bg-base-300 dark:hover:bg-[var(--color-surface-muted)]",
  danger:
    "bg-transparent text-primary-900 border border-base-500 hover:bg-base-200 dark:text-[var(--color-fg)] dark:border-[var(--color-border-strong)] dark:hover:bg-[var(--color-surface-muted)]",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-7 px-2.5 text-[12px]",
  md: "h-8 px-3 text-[13px]",
  lg: "h-10 px-4 text-[13px]",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded font-medium tracking-tight transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    />
  );
});
