import { cn } from "@/lib/utils/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="font-[family-name:var(--font-mono-token)] text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}
