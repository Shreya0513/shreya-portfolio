export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

export type SkillStrength = "familiar" | "proficient" | "strong";

export interface SkillDetail {
  name: string;
  category: string;
  strength: SkillStrength;
  summary: string;
  usedIn: string[];
  relatedSkills: string[];
  snippet?: string;
}
