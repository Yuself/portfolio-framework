export function SiteHeader({ displayName }: { displayName: string }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#main-content" aria-label={`${displayName}, home`}>
        AM<span aria-hidden="true">/</span>25
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a><a href="#about">About</a>
        <a href="#experience">Experience</a><a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
