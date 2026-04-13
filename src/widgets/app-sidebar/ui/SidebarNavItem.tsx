"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";

type Props = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function SidebarNavItem({ href, label, icon }: Props) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-8 items-center gap-2 rounded px-2 text-[13px] transition-colors",
        active
          ? "bg-[var(--color-surface-muted)] text-[var(--color-fg)]"
          : "text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]",
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center",
          active ? "text-accent-500" : "text-[var(--color-fg-subtle)] group-hover:text-[var(--color-fg-muted)]",
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
      {active && <span className="ml-auto h-1 w-1 rounded-full bg-accent-400" />}
    </Link>
  );
}
