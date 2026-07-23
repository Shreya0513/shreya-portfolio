import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const avatarStyles = cva("relative shrink-0 rounded-full overflow-hidden bg-[var(--color-bg-subtle)]", {
  variants: {
    size: {
      sm: "size-10",
      md: "size-14",
      lg: "size-24",
      xl: "size-40",
    },
    ring: {
      true: "ring-2 ring-[var(--accent-violet)]/30 ring-offset-4 ring-offset-[var(--color-bg)]",
      false: "",
    },
  },
  defaultVariants: { size: "md", ring: false },
});

export interface AvatarProps extends VariantProps<typeof avatarStyles> {
  src: string;
  alt: string;
  className?: string;
}

const pxBySize = { sm: 40, md: 56, lg: 96, xl: 160 };

export function Avatar({ src, alt, size = "md", ring, className }: AvatarProps) {
  const px = pxBySize[size ?? "md"];
  return (
    <span className={cn(avatarStyles({ size, ring }), className)}>
      <Image src={src} alt={alt} width={px} height={px} className="size-full object-cover" />
    </span>
  );
}
