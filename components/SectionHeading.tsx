import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  sub
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <>
      <Reveal>
        <div className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mb-2.5 font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-text">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mb-14 max-w-xl text-[15px] text-text-dim">{sub}</p>
      </Reveal>
    </>
  );
}
