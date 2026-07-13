const socials = [
  { label: "GitHub", href: "https://github.com/antunishdPursuit" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dennys-antunish/" },
];

export default function Contact() {
  return (
    <footer id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-12 md:pt-40">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Contact</span>

      <a
        href="https://www.linkedin.com/in/dennys-antunish/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 block"
      >
        <h2 className="display text-[clamp(2.5rem,11vw,10rem)] leading-none text-paper transition-colors group-hover:text-lime">
          LET&apos;S BUILD
        </h2>
        <span className="mt-4 inline-flex items-center gap-3 text-lg text-muted transition-colors group-hover:text-paper">
          Available for work — reach me on LinkedIn <span className="text-lime">↗</span>
        </span>
      </a>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <span className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Dennys Antunish
        </span>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-lime"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
