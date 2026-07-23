"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsContextValue {
  value: string;
  setValue: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used within <Tabs>");
  return ctx;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (id: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ items, defaultValue, onChange, children, className }: TabsProps) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.id);

  const handleChange = (id: string) => {
    setValue(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ value, setValue: handleChange }}>
      <div className={className}>
        <div
          role="tablist"
          className="relative flex gap-1 rounded-md bg-[var(--color-bg-subtle)] p-1"
        >
          {items.map((item) => {
            const active = item.id === value;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleChange(item.id)}
                className={cn(
                  "relative z-10 flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  active
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="tabs-active-pill"
                    className="absolute inset-0 -z-10 rounded-sm bg-[var(--color-bg-elevated)] shadow-[var(--shadow-xs)]"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { value } = useTabsContext();
  if (value !== id) return null;
  return (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="pt-6"
    >
      {children}
    </motion.div>
  );
}
