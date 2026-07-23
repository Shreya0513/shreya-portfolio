"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SUGGESTIONS = [
  "Tell me about your backend work",
  "Show me your projects",
  "How much experience do you have?",
  "Download your resume",
];

export interface CommandSearchProps {
  onAsk: (question: string) => void;
  showSuggestions?: boolean;
}

export function CommandSearch({ onAsk, showSuggestions = true }: CommandSearchProps) {
  const [query, setQuery] = useState("");

  const submit = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    onAsk(q);
    setQuery("");
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="flex items-center gap-3 rounded-full bg-[var(--color-bg-elevated)] px-5 py-3.5 shadow-[var(--shadow-md)] ring-1 ring-[var(--color-border)] transition-shadow duration-[var(--duration-base)] focus-within:shadow-[var(--shadow-lg)] focus-within:ring-[var(--color-focus-ring)]"
      >
        <Sparkles className="size-4 shrink-0 text-[var(--color-accent)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything…"
          aria-label="Ask about Shreya's work"
          className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--color-accent-gradient)] text-[var(--color-on-accent)] transition-transform duration-[var(--duration-fast)] hover:scale-105"
        >
          <ArrowRight className="size-4" />
        </button>
      </form>

      {showSuggestions && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              className={cn(
                "rounded-full bg-[var(--color-bg-subtle)] px-3.5 py-1.5 text-xs text-[var(--color-text-secondary)]",
                "transition-colors duration-[var(--duration-fast)] hover:bg-[var(--gray-100)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
