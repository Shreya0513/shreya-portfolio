"use client";

import { useCallback, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { NavCards } from "./NavCards";
import { ChatTranscript } from "./ChatTranscript";
import { ThemeStudio } from "./ThemeStudio";
import { CommandSearch, Container } from "@/components/ui";
import { profile } from "@/content/profile";
import { qaEntries, qaFallback } from "@/content/qa";
import { matchIntent } from "@/lib/intentMatcher";
import type { TabId } from "@/lib/types/tab";
import type { ChatMessage } from "@/lib/types/chat";

const TOPIC_QUESTIONS: Record<TabId, string> = {
  me: "Tell me about Shreya",
  projects: "Show me your projects",
  skills: "What are your skills?",
  fun: "Anything fun about you?",
  contact: "How can I reach you?",
};

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function PortfolioShell() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTopic, setActiveTopic] = useState<TabId | null>(null);
  const [studioOpen, setStudioOpen] = useState(false);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const ask = useCallback((question: string, entryId?: string, newChat = false) => {
    if (newChat && typeTimer.current) clearInterval(typeTimer.current);
    const userMessage: ChatMessage = { id: nextId(), role: "user", text: question };
    const assistantId = nextId();
    const pendingMessage: ChatMessage = { id: assistantId, role: "assistant", text: "", pending: true };
    setMessages((prev) => (newChat ? [userMessage, pendingMessage] : [...prev, userMessage, pendingMessage]));

    const match = entryId
      ? qaEntries.find((e) => e.id === entryId) ?? null
      : matchIntent(question, qaEntries);
    const answer = match?.answer ?? qaFallback;

    window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, pending: false } : m))
      );

      if (typeTimer.current) clearInterval(typeTimer.current);
      let i = 0;
      typeTimer.current = setInterval(() => {
        i += 3;
        const slice = answer.slice(0, i);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: slice } : m))
        );
        if (i >= answer.length) {
          if (typeTimer.current) clearInterval(typeTimer.current);
          if (match?.links || match?.tags || match?.tagGroups) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, links: match.links, tags: match.tags, tagGroups: match.tagGroups }
                  : m
              )
            );
          }
        }
      }, 16);
    }, 450);
  }, []);

  const onSelectTopic = useCallback(
    (tab: TabId) => {
      setActiveTopic(tab);
      // each tab starts a fresh chat, not a continuation of the last one
      ask(TOPIC_QUESTIONS[tab], tab, true);
    },
    [ask]
  );

  const hasConversation = messages.length > 0;

  return (
    <main className="flex h-[100svh] flex-col overflow-hidden">
      <button
        type="button"
        onClick={() => setStudioOpen(true)}
        aria-label="Open theme studio"
        className="fixed right-5 top-5 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-border)] transition-all duration-[var(--duration-fast)] hover:text-[var(--color-accent)] hover:shadow-[var(--shadow-md)]"
      >
        <Palette className="size-5" />
      </button>
      <ThemeStudio open={studioOpen} onClose={() => setStudioOpen(false)} />
      <div
        className={
          "flex min-h-0 flex-1 flex-col items-center px-6 " +
          (hasConversation ? "justify-start pt-10" : "justify-center")
        }
      >
        <Container
          size="narrow"
          className="flex w-full min-h-0 flex-1 flex-col items-center justify-center"
        >
          {!hasConversation ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="font-[family-name:var(--font-mono-token)] text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] sm:text-sm">
                Hey, I&apos;m {profile.name.split(" ")[0]} 👋
              </span>
              <h1 className="text-4xl font-semibold tracking-[var(--tracking-heading)] text-[var(--color-text-primary)] sm:text-5xl">
                {profile.role}
              </h1>
            </div>
          ) : (
            <div className="w-full min-h-0 flex-1 overflow-y-auto">
              <ChatTranscript messages={messages} />
            </div>
          )}
        </Container>
      </div>

      <div className="z-30 flex flex-col items-center gap-4 px-6 pb-6 pt-4">
        <Container size="narrow" className="flex w-full flex-col items-center gap-4">
          <NavCards activeTab={activeTopic} onSelect={onSelectTopic} />
          <CommandSearch onAsk={(q) => ask(q)} showSuggestions={!hasConversation} />
        </Container>
      </div>
    </main>
  );
}
