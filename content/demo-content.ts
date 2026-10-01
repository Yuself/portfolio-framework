import type { PortfolioContent } from "@/lib/portfolio-schema";

export const demoContent: PortfolioContent = {
  displayName: "Avery Morgan",
  headline: "Frontend systems for thoughtful AI products.",
  summary:
    "A fictional engineer profile demonstrating how this framework presents interface craft, system thinking, and verifiable project evidence.",
  email: "hello@example.com",
  projects: [
    {
      slug: "signal-canvas",
      title: "Signal Canvas",
      summary:
        "A streaming research workspace that turns model output into inspectable evidence cards.",
      category: "AI UI",
      stack: ["Next.js", "TypeScript", "Streaming UI"],
      highlights: [
        "Progressive response rendering with explicit source states",
        "Keyboard-first review flow with resilient empty states",
      ],
    },
    {
      slug: "interface-observatory",
      title: "Interface Observatory",
      summary:
        "A component-quality dashboard for tracking accessibility, motion, and responsive behavior.",
      category: "Frontend Systems",
      stack: ["React", "Design tokens", "Playwright"],
      highlights: [
        "Config-driven component catalog and visual checkpoints",
        "Automated overflow, focus, and reduced-motion validation",
      ],
    },
    {
      slug: "prompt-trace",
      title: "Prompt Trace",
      summary:
        "A local developer tool for comparing structured prompt revisions and evaluation notes.",
      category: "Developer Tools",
      stack: ["Node.js", "Schema validation", "Git"],
      highlights: [
        "Deterministic comparison pipeline with readable provenance",
        "Privacy-aware exports that redact configuration secrets",
      ],
    },
  ],
  experience: [
    {
      period: "2025 — Now",
      role: "Interface Systems Engineer",
      organization: "Northstar Studio",
      summary:
        "Fictional role focused on reusable product foundations and accessible AI interactions.",
    },
    {
      period: "2023 — 2025",
      role: "Frontend Engineer",
      organization: "Common Thread Labs",
      summary:
        "Fictional role delivering responsive tools and measurable interface quality improvements.",
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Accessible UI",
    "Design systems",
    "Testing",
  ],
};
