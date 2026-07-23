"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  applyThemeOverrides,
  DEFAULT_THEME_OVERRIDES,
  type ThemeOverrides,
} from "@/lib/theme/tokenPresets";

const STORAGE_KEY = "portfolio-theme-overrides";

interface ThemeContextValue {
  overrides: ThemeOverrides;
  setOverride: <K extends keyof ThemeOverrides>(key: K, value: ThemeOverrides[K]) => void;
  reset: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ThemeOverrides>(DEFAULT_THEME_OVERRIDES);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = { ...DEFAULT_THEME_OVERRIDES, ...JSON.parse(stored) };
        setOverrides(parsed);
        applyThemeOverrides(parsed);
        return;
      }
    } catch {
      // ignore malformed storage, fall through to defaults
    }
    applyThemeOverrides(DEFAULT_THEME_OVERRIDES);
  }, []);

  const setOverride = useCallback(
    <K extends keyof ThemeOverrides>(key: K, value: ThemeOverrides[K]) => {
      setOverrides((prev) => {
        const next = { ...prev, [key]: value };
        applyThemeOverrides(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // storage unavailable — theme still applies for this session
        }
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setOverrides(DEFAULT_THEME_OVERRIDES);
    applyThemeOverrides(DEFAULT_THEME_OVERRIDES);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ overrides, setOverride, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
