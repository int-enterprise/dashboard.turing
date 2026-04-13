import { cn } from "@/shared/lib/cn";
import { GRADE_LABEL, GRADE_TONE, type Grade } from "@/entities/evaluation";

type Props = { grade: Grade; className?: string; showDot?: boolean };

export function GradeBadge({ grade, className, showDot = true }: Props) {
  const tone = GRADE_TONE[grade];
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 font-mono text-[10.5px] uppercase tracking-wider border",
        tone.fg,
        tone.bg,
        tone.border,
        className,
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", tone.bar)} />}
      {GRADE_LABEL[grade]}
    </span>
  );
}
