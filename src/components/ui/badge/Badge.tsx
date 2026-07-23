import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium font-[family-name:var(--font-mono-token)] tracking-[var(--tracking-label)]",
  {
    variants: {
      variant: {
        neutral: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]",
        accent: "bg-[var(--accent-indigo)]/10 text-[var(--color-accent)]",
        outline:
          "bg-transparent text-[var(--color-text-secondary)] ring-1 ring-inset ring-[var(--color-border)]",
      },
      size: {
        sm: "text-xs px-2.5 py-1",
        md: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {
  icon?: ReactNode;
}

export function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeStyles({ variant, size }), className)} {...props}>
      {icon}
      {children}
    </span>
  );
}
