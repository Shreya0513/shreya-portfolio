import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const cardStyles = cva("rounded-lg transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)]", {
  variants: {
    variant: {
      flat: "bg-[var(--color-bg-subtle)]",
      elevated: "bg-[var(--color-bg-elevated)] shadow-[var(--shadow-sm)]",
      glass:
        "bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] backdrop-saturate-[var(--glass-saturate)] shadow-[var(--shadow-sm)]",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    interactive: {
      true: "hover:-translate-y-1 hover:shadow-[var(--shadow-md)] cursor-pointer",
      false: "",
    },
  },
  defaultVariants: {
    variant: "elevated",
    padding: "md",
    interactive: false,
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof cardStyles> {
  as?: "div" | "article";
}

export const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, variant, padding, interactive, as = "div", ...props }, ref) => {
    const Comp = as as "div";
    return (
      <Comp
        ref={ref as never}
        className={cn(cardStyles({ variant, padding, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
