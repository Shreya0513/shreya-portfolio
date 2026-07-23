import type { SkillDetail } from "@/lib/types/skill";

export const skillDetails: SkillDetail[] = [
  {
    name: "Java",
    category: "Backend",
    strength: "strong",
    summary:
      "Primary backend language across every production role — API design, business logic, and the services behind DMG's operational dashboards.",
    usedIn: [
      "Job Listing / Boot-up / App Details API refactor (DMG)",
      "Superstar backend API (Star Health)",
    ],
    relatedSkills: ["Spring Boot", "Microservices", "Design Patterns"],
    snippet: `@GetMapping("/jobs/{id}")
public JobDetailResponse getJob(@PathVariable Long id) {
    return jobService.fetchSummary(id); // selective fields only
}`,
  },
  {
    name: "Spring Boot",
    category: "Backend",
    strength: "strong",
    summary:
      "Framework of choice for REST APIs and microservices — dependency injection, validation, and the response-shaping work behind a 50% payload reduction.",
    usedIn: ["Job Operations Dashboard (DMG)", "Payment Link & Acknowledgement Tile modules (Star Health)"],
    relatedSkills: ["Java", "REST APIs", "PostgreSQL"],
  },
  {
    name: "React",
    category: "Frontend & Mobile",
    strength: "strong",
    summary:
      "Built the DMG Web App's core operational workflows from scratch — Job Details, Check-in, App Installation — shipped in a single month.",
    usedIn: ["DMG Web App", "Job Operations Dashboard", "Role-based banner system (Star Health)"],
    relatedSkills: ["Redux Saga", "JavaScript", "React Native"],
  },
  {
    name: "Kafka",
    category: "Backend",
    strength: "proficient",
    summary:
      "Event-driven patterns for decoupling operational data flows — part of the backend toolkit alongside Redis for caching hot paths.",
    usedIn: ["DMG operational tooling"],
    relatedSkills: ["Redis", "Microservices", "Java"],
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    strength: "proficient",
    summary:
      "Cloud infrastructure for deployment and observability — paired with Kibana and Datadog for on-call log analysis across 50+ triaged incidents.",
    usedIn: ["DMG production infrastructure"],
    relatedSkills: ["Docker", "CI/CD", "Linux"],
  },
];
