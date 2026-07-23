import type { SkillCategory } from "@/lib/types/skill";

export const skills: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "Kafka", "Redis"],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    skills: ["React", "React Native", "JavaScript", "Redux", "Redux Saga"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: ["AWS", "Git", "GitHub", "CI/CD", "Linux", "Docker"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Postman", "Kibana", "OpenSearch", "Datadog", "Sentry", "Mixpanel"],
  },
  {
    id: "concepts",
    label: "Concepts & Testing",
    skills: [
      "System Design",
      "OOP",
      "Data Structures",
      "Algorithms",
      "Design Patterns",
      "JUnit",
      "Jest",
      "Mockito",
    ],
  },
];
