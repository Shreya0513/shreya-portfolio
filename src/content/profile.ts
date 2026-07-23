export const profile = {
  name: "Shreya Chauhan",
  role: "Software Development Engineer 1",
  location: "Bengaluru, IN",
  summary:
    "Software Engineer with experience building scalable web and mobile applications using Java, Spring Boot, React, and React Native. Delivered production features, API optimizations, and operational dashboards supporting large-scale business workflows.",
  email: "shreya.it41@gmail.com",
  phone: "9352731330",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    leetcode: "https://leetcode.com/",
    resume: "/resume/Shreya-Chauhan-Resume.pdf",
  },
  stats: [
    { label: "API payload cut", value: "50%" },
    { label: "Incidents triaged", value: "50+" },
    { label: "Manual work reduced", value: "10.2%" },
    { label: "On-call rotations", value: "5+" },
  ],
  values: [
    {
      title: "Systems, not just screens",
      description:
        "I design features by tracing them end-to-end — from the API contract to the database to the pixel — so the parts hold together under real load.",
    },
    {
      title: "Operational empathy",
      description:
        "Weekly on-call rotations taught me to build for the engineer debugging this at 2am: clear logs, sane defaults, dashboards that actually answer the question.",
    },
    {
      title: "Ship small, ship often",
      description:
        "Payload optimizations, dashboard rollouts, migrations — I favor incremental, measurable changes over big-bang rewrites.",
    },
  ],
} as const;
