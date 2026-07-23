import type { QALink, QATagGroup } from "@/lib/types/qa";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  tags?: string[];
  tagGroups?: QATagGroup[];
  links?: QALink[];
  pending?: boolean;
}
