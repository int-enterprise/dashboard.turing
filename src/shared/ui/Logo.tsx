import Image from "next/image";
import { cn } from "../lib/cn";

type Props = {
  className?: string;
  size?: number;
  invertOnDark?: boolean;
};

export function Logo({ className, size = 20, invertOnDark = true }: Props) {
  return (
    <Image
      src="/turing-logo.png"
      alt="turing"
      width={size * 3}
      height={size}
      priority
      className={cn(
        "h-[var(--logo-h)] w-auto select-none",
        invertOnDark && "dark:invert",
        className,
      )}
      style={{ "--logo-h": `${size}px` } as React.CSSProperties}
    />
  );
}
