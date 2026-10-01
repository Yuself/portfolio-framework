export function ContactSection({ email }: { email: string }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">Start a conversation</p>
      <h2 id="contact-title">Build something legible, useful, and difficult to misunderstand.</h2>
      <a className="contact-link" href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a>
    </section>
  );
}
