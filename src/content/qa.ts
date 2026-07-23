import type { QAEntry } from "@/lib/types/qa";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { skills } from "@/content/skills";
import { projects } from "@/content/projects";

// Canonical entries — one per nav topic (id matches TabId exactly, so
// clicking a nav card can look these up directly instead of relying on
// fuzzy matching). Additional free-text entries below widen what the
// search bar can catch. Answers use \n for line breaks — ChatTranscript
// renders them with whitespace-pre-line, so keep authored structure here.

const experienceLines = experience
  .map((e) => `• ${e.role} @ ${e.company} (${e.startDate}–${e.endDate === "present" ? "Present" : e.endDate})`)
  .join("\n");

const educationLine = education
  .map((e) => `${e.degree}, ${e.institution}${e.cgpa ? ` · CGPA ${e.cgpa}` : ""}`)
  .join(", ");

const projectLines = projects
  .map((p) => `• ${p.title} — ${p.status === "placeholder" ? "🚧 details coming soon" : p.tagline}`)
  .join("\n");

export const qaEntries: QAEntry[] = [
  {
    id: "me",
    triggers: ["about", "who are you", "who is shreya", "philosophy", "values", "approach", "yourself"],
    answer: `👋 Hey! I'm ${profile.name}, a ${profile.role} based in ${profile.location}.\n\n${profile.summary}\n\n💼 Where I've worked:\n${experienceLines}\n\n🎓 ${educationLine}`,
    tags: ["Java", "Spring Boot", "React", "Backend-heavy", "On-call ready"],
  },
  {
    id: "projects",
    triggers: ["projects", "what have you built", "show projects", "portfolio", "built"],
    answer: `🛠️ Here's what I've built:\n${projectLines}`,
  },
  {
    id: "skills",
    triggers: ["skills", "tech stack", "what do you know", "technologies", "stack"],
    answer: "🧰 My stack, by category:",
    tagGroups: skills.map((c) => ({ label: c.label, items: c.skills })),
  },
  {
    id: "fun",
    triggers: ["fun", "game", "play", "easter egg", "hobbies"],
    answer:
      "🎉 Outside of shipping features, I'm usually debugging something for fun, grinding DSA on LeetCode, or negotiating with an on-call pager at 2am ☕.\n\nNo hidden games here (yet) — but ask me about a production incident, those are always a story 👀.",
    links: [{ label: "LeetCode", href: profile.links.leetcode }],
  },
  {
    id: "contact",
    triggers: ["contact", "email", "reach", "hire", "get in touch", "connect"],
    answer: "📬 Let's talk! Pick whichever's easiest for you:",
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "GitHub", href: profile.links.github },
      { label: "LinkedIn", href: profile.links.linkedin },
    ],
  },

  // Free-text extras for the search bar.
  {
    id: "backend",
    triggers: ["backend", "java", "spring boot", "server", "api work"],
    answer:
      "⚙️ Backend is where I live day-to-day — Java, Spring Boot, REST APIs and microservices.\n\nAt DMG I cut API payload size by 50% and led a Redux-to-Redux-Saga migration to clean up async state on the client side that was hammering those same endpoints.",
  },
  {
    id: "challenges",
    triggers: ["challenge", "problem", "hard", "difficult", "solved"],
    answer:
      "🔥 One recent one: on-call incidents were slow to triage because logs and job state lived in different systems.\n\nI helped build a Job Operations Dashboard that surfaced both together — cut investigation time noticeably for the on-call rotation.",
  },
  {
    id: "resume",
    triggers: ["resume", "cv", "download"],
    answer: "📄 Grab it here — opens the PDF directly.",
    links: [{ label: "Resume", href: profile.links.resume }],
  },
  {
    id: "experience-years",
    triggers: ["how much experience", "years of experience", "how long"],
    answer: `🗓️ I'm an SDE 1 at Divisions Maintenance Group since August 2025, after an internship at Star Health and Allied Insurance.\n\nFull timeline:\n${experienceLines}`,
  },
];

export const qaFallback =
  "🤔 I don't have a scripted answer for that yet — try asking about my background, projects, skills, or how to reach me.";
