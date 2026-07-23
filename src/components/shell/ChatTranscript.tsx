"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Download, Code2, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Badge, GithubIcon, LinkedinIcon } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { fadeInUp, springSnappy } from "@/lib/motion";
import type { ChatMessage } from "@/lib/types/chat";
import type { QALink } from "@/lib/types/qa";

export interface ChatTranscriptProps {
  messages: ChatMessage[];
}

export function ChatTranscript({ messages }: ChatTranscriptProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-5 pb-6">
      {messages.map((m) => (
        <motion.div
          key={m.id}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={cn("flex items-end gap-2.5", m.role === "user" ? "justify-end" : "justify-start")}
        >
          {m.role === "assistant" && (
            <span className="mb-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[image:var(--color-accent-gradient)] text-[var(--color-on-accent)] shadow-[var(--shadow-xs)]">
              <Sparkles className="size-3.5" />
            </span>
          )}

          <div
            className={cn(
              "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-xs)]",
              m.role === "user"
                ? "rounded-br-md bg-[image:var(--color-accent-gradient)] text-[var(--color-on-accent)]"
                : "rounded-bl-md bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
            )}
          >
            {m.pending ? (
              <span className="inline-flex items-center gap-1.5 py-0.5">
                <ThinkingDots />
              </span>
            ) : (
              <>
                <span className="whitespace-pre-line">{m.text}</span>

                {m.tags && m.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.tags.map((tag) => (
                      <Badge key={tag} variant="accent" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {m.tagGroups && m.tagGroups.length > 0 && (
                  <div className="mt-3 flex flex-col gap-3">
                    {m.tagGroups.map((group) => (
                      <div key={group.label}>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)]">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <Badge key={item} variant="accent" size="sm">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {m.links && m.links.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {m.links.map((link) => (
                      <LinkCard key={link.href} link={link} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

function resolveLinkStyle(label: string): { icon: ReactNode; color: string; subtitle: string } {
  const clean = label.replace(/[^\w\s]/g, "").trim().toLowerCase();

  if (clean.includes("email")) {
    return { icon: <Mail className="size-4" />, color: "var(--color-brand-email)", subtitle: "Send a message" };
  }
  if (clean.includes("github")) {
    return { icon: <GithubIcon className="size-4" />, color: "var(--color-brand-github)", subtitle: "See my code" };
  }
  if (clean.includes("linkedin")) {
    return { icon: <LinkedinIcon className="size-4" />, color: "var(--color-brand-linkedin)", subtitle: "Let's connect" };
  }
  if (clean.includes("resume") || clean.includes("cv")) {
    return { icon: <Download className="size-4" />, color: "var(--color-brand-resume)", subtitle: "Download PDF" };
  }
  if (clean.includes("leetcode")) {
    return { icon: <Code2 className="size-4" />, color: "var(--color-brand-leetcode)", subtitle: "Problem solving" };
  }
  return { icon: <ArrowUpRight className="size-4" />, color: "var(--color-accent)", subtitle: "Open link" };
}

function LinkCard({ link }: { link: QALink }) {
  const { icon, color, subtitle } = resolveLinkStyle(link.label);
  const cleanLabel = link.label.replace(/[^\w\s]/g, "").trim();

  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      whileHover={{ x: 3 }}
      transition={springSnappy}
      className="group flex items-center gap-3 rounded-xl bg-[var(--color-bg-elevated)] p-2.5 pr-3 shadow-[var(--shadow-xs)] ring-1 ring-[var(--color-border)] transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--shadow-sm)]"
    >
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
          {cleanLabel}
        </span>
        <span className="truncate text-xs text-[var(--color-text-tertiary)]">{subtitle}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}

function ThinkingDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-[var(--color-text-tertiary)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </>
  );
}
