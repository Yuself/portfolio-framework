import { SectionHeading } from "@/components/ui/section-heading";
import type { Experience } from "@/lib/portfolio-schema";

export function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <section className="content-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" eyebrow="Experience" title="A record of deliberate systems work." />
      <ol className="timeline">{experience.map((item) => (
        <li key={`${item.period}-${item.role}`}>
          <p className="timeline-period">{item.period}</p>
          <div><h3>{item.role}</h3><p className="timeline-organization">{item.organization}</p><p>{item.summary}</p></div>
        </li>
      ))}</ol>
    </section>
  );
}
