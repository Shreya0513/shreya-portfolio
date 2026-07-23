import type { ExperienceEntry } from "@/lib/types/experience";

export const experience: ExperienceEntry[] = [
  {
    id: "dmg",
    company: "Divisions Maintenance Group",
    role: "Software Development Engineer 1",
    location: "Bengaluru, IN",
    startDate: "Aug 2025",
    endDate: "present",
    bullets: [
      "Refactored Job Listing, Boot-up, and App Details APIs, reducing payload size by 50% through response optimization and selective data fetching, resulting in significantly faster API response times.",
      "Developed a Job Operations Dashboard using React and Spring Boot to streamline internal operations, helping on-call engineers investigate issues faster while enabling non-technical teams to track job statuses and operational metrics.",
      "Partnering with engineering leadership and business stakeholders to deliver Phase 1 of a Snow Research Dashboard, enabling visibility into job activity and geotagged field data for seasonal planning initiatives.",
      "Supported production on-call operations across 5+ weekly rotations, investigating and triaging 50+ FH incidents through root cause analysis and log analysis.",
      "Developed core React workflows for the DMG Web App, including Job Details, Check-in, and App Installation pages, delivering the platform within one month and enabling technicians without the mobile app to complete operational workflows digitally, reducing manual intervention by 10.2% (40 hours/week).",
      "Led migration of pre-login and profile workflows from Redux to Redux-Saga, improving asynchronous state management and optimizing API-driven user experiences.",
    ],
    techStack: ["React", "Spring Boot", "Java", "Redux Saga", "AWS", "Kibana", "Datadog"],
  },
  {
    id: "star-health",
    company: "Star Health and Allied Insurance",
    role: "Software Development Engineer Intern",
    location: "Gurugram, IN",
    startDate: "Jan 2025",
    endDate: "Jul 2025",
    bullets: [
      "Developed and deployed a dynamic banner system displaying role-based content (Agent, CSM, SSM) post-authentication, improving user engagement by 25%.",
      "Engineered Payment Link and Acknowledgement Tile modules with complete API integration.",
      "Built scalable backend API for Superstar product.",
      "Contributed to 10+ user stories and 20+ code reviews in an Agile environment.",
    ],
    techStack: ["React", "Java", "Spring Boot", "REST APIs", "MySQL"],
  },
  {
    id: "atishay",
    company: "Atishay Ltd",
    role: "Intern",
    location: "Jaipur, IN",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    bullets: [
      "Validated UIDAI biometric/OTP authentication via white-box testing.",
    ],
    techStack: ["White-box Testing"],
  },
];
