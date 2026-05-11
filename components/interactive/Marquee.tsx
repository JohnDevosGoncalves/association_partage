"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  /** Durée d'un cycle complet en secondes (plus grand = plus lent) */
  duration?: number;
  /** Inverse le sens de défilement */
  reverse?: boolean;
};

/**
 * Bandeau marquee infini — défilement horizontal continu sans saccade.
 *
 * Technique : on duplique la liste et on translate de -50% (puisque la liste
 * dupliquée occupe le double de la largeur d'origine, -50% = exactement la
 * première liste hors écran, la deuxième prend sa place de façon transparente).
 *
 * Respecte `prefers-reduced-motion` : si activé, le bandeau reste statique.
 *
 * Usage typique : marquer une continuité narrative (lieux, dates, valeurs)
 * sous le Hero ou entre deux sections fortes.
 */
export function Marquee({ items, duration = 40, reverse = false }: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
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

      <motion.div
        className="flex gap-10 md:gap-16 whitespace-nowrap will-change-transform"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: reverse ? ["−50%", "0%"] : ["0%", "-50%"],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                x: {
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
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
      </motion.div>
    </div>
  );
}
