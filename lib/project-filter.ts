import type { Project, ProjectCategory } from "@/lib/portfolio-schema";

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | "All",
): Project[] {
  return category === "All"
    ? [...projects]
    : projects.filter((project) => project.category === category);
}
