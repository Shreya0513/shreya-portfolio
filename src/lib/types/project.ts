export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  status: "placeholder" | "complete";
  coverImageSrc?: string;
  problem: string;
  solution: string;
  architectureNotes?: string;
  techStack: string[];
  role?: string;
  timeline?: string;
  links: { github?: string; live?: string; caseStudy?: string };
  highlights?: string[];
}
