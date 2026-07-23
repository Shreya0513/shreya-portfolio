import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE_STANDARD } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Spring presets — mirror the --spring-* CSS tokens in tokens.css. */
export const springSnappy = { type: "spring", stiffness: 420, damping: 32 } as const;
export const springSoft = { type: "spring", stiffness: 220, damping: 26 } as const;
export const springFloat = { type: "spring", stiffness: 60, damping: 14 } as const;
