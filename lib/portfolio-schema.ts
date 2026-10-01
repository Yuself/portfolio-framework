export type ProjectCategory =
  | "AI UI"
  | "Frontend Systems"
  | "Developer Tools";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  stack: string[];
  highlights: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

export interface Experience {
  period: string;
  role: string;
  organization: string;
  summary: string;
}

export interface PortfolioContent {
  displayName: string;
  headline: string;
  summary: string;
  email: string;
  projects: Project[];
  experience: Experience[];
  skills: string[];
}

const categories = new Set<ProjectCategory>([
  "AI UI",
  "Frontend Systems",
  "Developer Tools",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => isNonEmptyString(item))
  );
}

export function validatePortfolioContent(value: unknown): string[] {
  if (!value || typeof value !== "object") return ["content must be an object"];

  const content = value as Record<string, unknown>;
  const errors: string[] = [];
  for (const field of ["displayName", "headline", "summary"] as const) {
    if (!isNonEmptyString(content[field])) errors.push(`${field} is required`);
  }

  if (
    !isNonEmptyString(content.email) ||
    !content.email.toLowerCase().endsWith("@example.com")
  ) {
    errors.push("email must use example.com");
  }

  if (!Array.isArray(content.projects)) {
    errors.push("projects must be an array");
  } else {
    content.projects.forEach((candidate, index) => {
      const project =
        candidate && typeof candidate === "object"
          ? (candidate as Record<string, unknown>)
          : {};
      for (const field of ["title", "summary"] as const) {
        if (!isNonEmptyString(project[field])) {
          errors.push(`projects[${index}].${field} is required`);
        }
      }
      if (!categories.has(project.category as ProjectCategory)) {
        errors.push(`projects[${index}].category is required`);
      }
      for (const field of ["stack", "highlights"] as const) {
        if (!isNonEmptyStringArray(project[field])) {
          errors.push(`projects[${index}].${field} is required`);
        }
      }
    });
  }

  if (!Array.isArray(content.experience)) {
    errors.push("experience must be an array");
  }
  if (!isNonEmptyStringArray(content.skills)) {
    errors.push("skills must be a non-empty string array");
  }

  return errors;
}
