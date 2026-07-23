import type { QAEntry } from "@/lib/types/qa";

export function matchIntent(query: string, entries: QAEntry[]): QAEntry | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  let best: { entry: QAEntry; score: number } | null = null;

  for (const entry of entries) {
    let score = 0;
    for (const trigger of entry.triggers) {
      const t = trigger.toLowerCase();
      if (normalized.includes(t)) {
        score += t.split(" ").length * 2;
        continue;
      }
      const words = t.split(" ");
      const matchedWords = words.filter((w) => normalized.includes(w));
      score += matchedWords.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best?.entry ?? null;
}
