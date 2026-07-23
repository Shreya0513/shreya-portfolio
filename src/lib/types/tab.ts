export const TAB_IDS = ["me", "projects", "skills", "fun", "contact"] as const;
export type TabId = (typeof TAB_IDS)[number];

export function isTabId(value: string | null | undefined): value is TabId {
  return !!value && (TAB_IDS as readonly string[]).includes(value);
}
