export function SiteHeader({ displayName }: { displayName: string }) {
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.at(0)?.toUpperCase())
    .join("") || "PF";

  return (
    <header className="site-header">
      <a className="wordmark" href="#main-content" aria-label={`${displayName}, home`}>
        {initials}<span aria-hidden="true">/</span>PF
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a><a href="#about">About</a>
        <a href="#experience">Experience</a><a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
