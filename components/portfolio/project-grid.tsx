"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { filterProjects } from "@/lib/project-filter";
import type { Project, ProjectCategory } from "@/lib/portfolio-schema";

const filters: Array<ProjectCategory | "All"> = ["All", "AI UI", "Frontend Systems", "Developer Tools"];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">("All");
  const visibleProjects = filterProjects(projects, activeFilter);
  return (
    <section className="content-section" id="work" aria-labelledby="work-title">
      <SectionHeading id="work-title" eyebrow="Selected work" title="Systems, not screenshots." description="Each fictional project demonstrates a reusable product pattern and the engineering evidence behind it." />
      <div className="filter-row" aria-label="Filter selected work">
        {filters.map((filter) => (
          <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
        ))}
      </div>
      <div className="project-list" aria-live="polite">
        {visibleProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </div>
    </section>
  );
}
