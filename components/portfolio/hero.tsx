import type { PortfolioContent } from "@/lib/portfolio-schema";

export function Hero({ content }: { content: PortfolioContent }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-status"><span aria-hidden="true" />Fictional demo profile · Available for thoughtful work</div>
      <h1 id="hero-title"><span>{content.displayName}</span>{content.headline}</h1>
      <div className="hero-bottom">
        <p>{content.summary}</p>
        <a className="text-link" href="#work">Explore selected work <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  );
}
