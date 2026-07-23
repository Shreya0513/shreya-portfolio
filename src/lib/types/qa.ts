export interface QALink {
  label: string;
  href: string;
}

export interface QATagGroup {
  label: string;
  items: string[];
}

export interface QAEntry {
  id: string;
  triggers: string[];
  answer: string;
  tags?: string[];
  tagGroups?: QATagGroup[];
  links?: QALink[];
}
