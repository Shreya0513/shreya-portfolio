export interface AccentPreset {
  id: string;
  label: string;
  indigo: string;
  violet: string;
  cyan: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "indigo", label: "Indigo", indigo: "#4F46E5", violet: "#6D5EF9", cyan: "#06B6D4" },
  { id: "rose", label: "Rose", indigo: "#E11D48", violet: "#FB7185", cyan: "#F472B6" },
  { id: "emerald", label: "Emerald", indigo: "#059669", violet: "#10B981", cyan: "#34D399" },
  { id: "amber", label: "Amber", indigo: "#D97706", violet: "#F59E0B", cyan: "#FBBF24" },
  { id: "ocean", label: "Ocean", indigo: "#0369A1", violet: "#0EA5E9", cyan: "#22D3EE" },
  { id: "violet", label: "Violet", indigo: "#7C3AED", violet: "#A78BFA", cyan: "#C4B5FD" },
];

export interface RadiusPreset {
  id: string;
  label: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export const RADIUS_PRESETS: RadiusPreset[] = [
  { id: "sharp", label: "Sharp", sm: "4px", md: "8px", lg: "12px", xl: "16px" },
  { id: "soft", label: "Soft", sm: "8px", md: "14px", lg: "20px", xl: "28px" },
  { id: "round", label: "Round", sm: "12px", md: "20px", lg: "28px", xl: "36px" },
];

export interface ShadowPreset {
  id: string;
  label: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export const SHADOW_PRESETS: ShadowPreset[] = [
  {
    id: "flat",
    label: "Flat",
    xs: "0 1px 1px rgba(16,17,20,0.02)",
    sm: "0 1px 3px rgba(16,17,20,0.03)",
    md: "0 2px 8px rgba(16,17,20,0.04)",
    lg: "0 4px 16px rgba(16,17,20,0.05)",
  },
  {
    id: "soft",
    label: "Soft",
    xs: "0 1px 2px rgba(16,17,20,0.04)",
    sm: "0 2px 8px rgba(16,17,20,0.06)",
    md: "0 8px 24px rgba(16,17,20,0.08)",
    lg: "0 16px 48px rgba(16,17,20,0.1)",
  },
  {
    id: "elevated",
    label: "Elevated",
    xs: "0 2px 4px rgba(16,17,20,0.08)",
    sm: "0 4px 14px rgba(16,17,20,0.12)",
    md: "0 14px 36px rgba(16,17,20,0.16)",
    lg: "0 24px 64px rgba(16,17,20,0.2)",
  },
];

export interface GlassPreset {
  id: string;
  label: string;
  blur: string;
  bg: string;
  saturate: string;
}

export const GLASS_PRESETS: GlassPreset[] = [
  { id: "off", label: "Off", blur: "0px", bg: "rgba(255,255,255,0.96)", saturate: "100%" },
  { id: "subtle", label: "Subtle", blur: "20px", bg: "rgba(255,255,255,0.65)", saturate: "180%" },
  { id: "frosted", label: "Frosted", blur: "32px", bg: "rgba(255,255,255,0.45)", saturate: "220%" },
];

export interface ThemeOverrides {
  accent: string;
  radius: string;
  shadow: string;
  glass: string;
}

export const DEFAULT_THEME_OVERRIDES: ThemeOverrides = {
  accent: "indigo",
  radius: "soft",
  shadow: "soft",
  glass: "subtle",
};

export function applyThemeOverrides(overrides: ThemeOverrides) {
  const root = document.documentElement.style;

  const accent = ACCENT_PRESETS.find((p) => p.id === overrides.accent) ?? ACCENT_PRESETS[0];
  root.setProperty("--accent-indigo", accent.indigo);
  root.setProperty("--accent-violet", accent.violet);
  root.setProperty("--accent-cyan", accent.cyan);
  root.setProperty(
    "--accent-gradient",
    `linear-gradient(135deg, ${accent.indigo} 0%, ${accent.violet} 45%, ${accent.cyan} 100%)`
  );
  root.setProperty("--color-accent", accent.indigo);
  root.setProperty("--color-focus-ring", accent.violet);

  const radius = RADIUS_PRESETS.find((p) => p.id === overrides.radius) ?? RADIUS_PRESETS[1];
  root.setProperty("--radius-sm", radius.sm);
  root.setProperty("--radius-md", radius.md);
  root.setProperty("--radius-lg", radius.lg);
  root.setProperty("--radius-xl", radius.xl);

  const shadow = SHADOW_PRESETS.find((p) => p.id === overrides.shadow) ?? SHADOW_PRESETS[1];
  root.setProperty("--shadow-xs", shadow.xs);
  root.setProperty("--shadow-sm", shadow.sm);
  root.setProperty("--shadow-md", shadow.md);
  root.setProperty("--shadow-lg", shadow.lg);

  const glass = GLASS_PRESETS.find((p) => p.id === overrides.glass) ?? GLASS_PRESETS[1];
  root.setProperty("--glass-blur", glass.blur);
  root.setProperty("--glass-bg", glass.bg);
  root.setProperty("--glass-saturate", glass.saturate);
}

export function themeOverridesToJSON(overrides: ThemeOverrides): string {
  const accent = ACCENT_PRESETS.find((p) => p.id === overrides.accent) ?? ACCENT_PRESETS[0];
  const radius = RADIUS_PRESETS.find((p) => p.id === overrides.radius) ?? RADIUS_PRESETS[1];
  const shadow = SHADOW_PRESETS.find((p) => p.id === overrides.shadow) ?? SHADOW_PRESETS[1];
  const glass = GLASS_PRESETS.find((p) => p.id === overrides.glass) ?? GLASS_PRESETS[1];

  return JSON.stringify(
    {
      accent: { indigo: accent.indigo, violet: accent.violet, cyan: accent.cyan },
      radius: { sm: radius.sm, md: radius.md, lg: radius.lg, xl: radius.xl },
      shadow: { xs: shadow.xs, sm: shadow.sm, md: shadow.md, lg: shadow.lg },
      glass: { blur: glass.blur, bg: glass.bg, saturate: glass.saturate },
    },
    null,
    2
  );
}
