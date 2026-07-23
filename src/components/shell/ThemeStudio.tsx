"use client";

import { useState } from "react";
import { Check, Copy, RotateCcw, Mail } from "lucide-react";
import { Badge, Button, Card, Dialog } from "@/components/ui";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";
import {
  ACCENT_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  GLASS_PRESETS,
  themeOverridesToJSON,
} from "@/lib/theme/tokenPresets";

export interface ThemeStudioProps {
  open: boolean;
  onClose: () => void;
}

export function ThemeStudio({ open, onClose }: ThemeStudioProps) {
  const { overrides, setOverride, reset } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(themeOverridesToJSON(overrides));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently no-op
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Theme Studio" className="max-w-3xl">
      <div className="flex flex-col gap-8">
        <p className="text-sm text-[var(--color-text-secondary)]">
          This whole site is built on design tokens — change them here and every component
          updates instantly, no reload. Everything you build should be this reusable.
        </p>

        {/* Live preview strip */}
        <Card variant="flat" padding="lg" className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm">
              Primary
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Badge variant="accent" size="sm">
              Accent badge
            </Badge>
            <Badge variant="outline" size="sm">
              Outline badge
            </Badge>
          </div>

          <Card variant="elevated" padding="md" className="flex items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--color-accent-gradient)] text-white">
              <Mail className="size-4" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                Link card
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                Radius, shadow &amp; accent preview
              </span>
            </span>
          </Card>

          <div
            className="w-full rounded-xl px-4 py-3 text-sm text-[var(--color-text-primary)]"
            style={{
              backdropFilter: "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
              background: "var(--glass-bg)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            Glass surface preview
          </div>
        </Card>

        <ControlGroup label="Accent">
          <div className="flex flex-wrap gap-2.5">
            {ACCENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setOverride("accent", preset.id)}
                aria-label={preset.label}
                aria-pressed={overrides.accent === preset.id}
                className={cn(
                  "relative size-10 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-bg-elevated)] transition-transform duration-[var(--duration-fast)] hover:scale-110",
                  overrides.accent === preset.id
                    ? "ring-[var(--color-text-primary)]"
                    : "ring-transparent"
                )}
                style={{
                  background: `linear-gradient(135deg, ${preset.indigo}, ${preset.violet}, ${preset.cyan})`,
                }}
              >
                {overrides.accent === preset.id && (
                  <Check className="absolute inset-0 m-auto size-4 text-white" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        </ControlGroup>

        <ControlGroup label="Corner radius">
          <PresetPills
            options={RADIUS_PRESETS}
            value={overrides.radius}
            onChange={(id) => setOverride("radius", id)}
          />
        </ControlGroup>

        <ControlGroup label="Shadow depth">
          <PresetPills
            options={SHADOW_PRESETS}
            value={overrides.shadow}
            onChange={(id) => setOverride("shadow", id)}
          />
        </ControlGroup>

        <ControlGroup label="Glass intensity">
          <PresetPills
            options={GLASS_PRESETS}
            value={overrides.glass}
            onChange={(id) => setOverride("glass", id)}
          />
        </ControlGroup>

        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-6">
          <Button variant="primary" size="sm" onClick={copyJSON}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied!" : "Copy theme JSON"}
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="size-4" />
            Reset to default
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--color-text-tertiary)]">
        {label}
      </p>
      {children}
    </div>
  );
}

function PresetPills<T extends { id: string; label: string }>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
            value === opt.id
              ? "bg-[image:var(--color-accent-gradient)] text-white"
              : "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
