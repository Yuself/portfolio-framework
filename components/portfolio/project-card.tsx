import type { Project } from "@/lib/portfolio-schema";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className="project-index">0{index + 1}</div>
      <div className="project-content">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="project-highlights" aria-label={`${project.title} highlights`}>
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </div>
      <ul className="stack-list" aria-label={`${project.title} technology stack`}>
        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </article>
  );
}
