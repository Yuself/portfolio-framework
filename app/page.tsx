import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { Hero } from "@/components/portfolio/hero";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Reveal } from "@/components/ui/reveal";
import { demoContent } from "@/content/demo-content";

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader displayName={demoContent.displayName} />
      <main id="main-content">
        <Hero content={demoContent} />
        <Reveal><ProjectGrid projects={demoContent.projects} /></Reveal>
        <Reveal><AboutSection content={demoContent} /></Reveal>
        <Reveal><ExperienceTimeline experience={demoContent.experience} /></Reveal>
        <Reveal><ContactSection email={demoContent.email} /></Reveal>
      </main>
      <footer className="site-footer">
        <p>Fictional content. Built as a privacy-safe framework demonstration.</p>
        <p>Next.js · TypeScript · Accessible by default</p>
      </footer>
    </div>
  );
}
