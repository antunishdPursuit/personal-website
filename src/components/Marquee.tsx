const items = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Three.js",
  "FastAPI",
  "Claude",
  "Flask",
  "Node",
  "GSAP",
  "WebGL",
  "AI Engineering",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 py-6 select-none">
      <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-bold text-muted md:text-4xl">
            {item}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
