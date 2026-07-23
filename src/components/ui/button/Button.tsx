import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-50 rounded-md whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "text-[var(--color-on-accent)] bg-[image:var(--color-accent-gradient)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-glow-accent)] hover:-translate-y-px active:translate-y-0",
        secondary:
          "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--gray-100)]",
        ghost:
          "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]",
        link: "bg-transparent text-[var(--color-accent)] underline-offset-4 hover:underline p-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },
    },
    compoundVariants: [{ variant: "link", size: ["sm", "md", "lg"], class: "h-auto" }],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconLeft,
      iconRight,
      loading,
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonStyles({ variant, size }), className);
    const content = (
      <>
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </>
    );

    if (href) {
      return (
        <a href={href} className={classes} aria-disabled={disabled}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
