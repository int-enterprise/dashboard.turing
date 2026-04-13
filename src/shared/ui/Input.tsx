import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-8 w-full rounded border bg-[var(--color-surface)] px-2.5 text-[13px] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)]",
        "border-[var(--color-border-strong)] focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500/40",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "font-mono",
        className,
      )}
      {...rest}
    />
  );
});
