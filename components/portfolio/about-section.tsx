import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioContent } from "@/lib/portfolio-schema";

export function AboutSection({ content }: { content: PortfolioContent }) {
  return (
    <section className="content-section about-grid" id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title" eyebrow="Approach" title="Clarity is a feature." />
      <div className="about-copy">
        <p>This framework keeps content separate from presentation, makes interaction states explicit, and treats accessibility checks as engineering constraints—not final-pass polish.</p>
        <p>Replace one typed content module to make it yours. The layout, validation, motion preferences, and responsive behavior remain reusable.</p>
        <ul className="skill-list" aria-label="Core skills">{content.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </div>
    </section>
  );
}
