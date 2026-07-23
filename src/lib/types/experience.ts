export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "present";
  bullets: string[];
  techStack: string[];
  logoSrc?: string;
}
