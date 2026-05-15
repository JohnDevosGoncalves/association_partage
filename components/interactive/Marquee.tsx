type MarqueeProps = {
  items: string[];
  /** Durée d'un cycle complet en secondes (plus grand = plus lent). */
  duration?: number;
};

/**
 * Bandeau marquee infini — pure CSS, server component, zéro JS.
 *
 * Technique : on duplique la liste et on translate de -50% via une
 * keyframe CSS continue. Pas besoin de framer-motion pour une animation
 * linéaire infinie.
 *
 * Respecte `prefers-reduced-motion` : animation désactivée si l'utilisateur
 * a coché cette préférence dans son système.
 */
export function Marquee({ items, duration = 40 }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-6 md:py-8 border-y border-atlas-ochre/15 bg-bridge-cream/40"
      role="marquee"
      aria-label="Bandeau défilant des marqueurs Association Partage"
    >
      {/* Masques latéraux pour fade-out */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--color-bridge-cream) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
        style={{
          background:
            "linear-gradient(270deg, var(--color-bridge-cream) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="marquee-track flex gap-10 md:gap-16 whitespace-nowrap"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 md:gap-16 font-serif italic text-2xl md:text-4xl lg:text-5xl font-extralight text-bridge-ink/55 tracking-tight"
          >
            {item}
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-atlas-saffron/60 shrink-0"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
