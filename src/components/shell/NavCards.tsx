"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Smile, Briefcase, Layers, PartyPopper, UserRound } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { springSnappy } from "@/lib/motion";
import type { TabId } from "@/lib/types/tab";

interface NavCardDef {
  id: TabId;
  label: string;
  icon: ReactNode;
  color: string;
}

const NAV_CARDS: NavCardDef[] = [
  { id: "me", label: "Me", icon: <Smile className="size-5" />, color: "var(--color-topic-me)" },
  {
    id: "projects",
    label: "Projects",
    icon: <Briefcase className="size-5" />,
    color: "var(--color-topic-projects)",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Layers className="size-5" />,
    color: "var(--color-topic-skills)",
  },
  { id: "fun", label: "Fun", icon: <PartyPopper className="size-5" />, color: "var(--color-topic-fun)" },
  {
    id: "contact",
    label: "Contact",
    icon: <UserRound className="size-5" />,
    color: "var(--color-topic-contact)",
  },
];

export interface NavCardsProps {
  activeTab: TabId | null;
  onSelect: (tab: TabId) => void;
}

export function NavCards({ activeTab, onSelect }: NavCardsProps) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio sections"
      className="grid grid-cols-5 gap-2 sm:gap-3"
    >
      {NAV_CARDS.map((card) => {
        const isActive = activeTab === card.id;
        return (
          <button
            key={card.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(card.id)}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 transition-colors duration-[var(--duration-fast)] sm:gap-2 sm:py-4",
              isActive
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="nav-card-active"
                className="absolute inset-0 rounded-2xl bg-[var(--color-bg-elevated)] shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-border)]"
                transition={springSnappy}
              />
            )}
            <span className="relative z-10" style={{ color: card.color }}>
              {card.icon}
            </span>
            <span className="relative z-10 text-xs font-medium sm:text-sm">
              {card.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
