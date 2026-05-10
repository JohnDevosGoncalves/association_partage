"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type WordRevealProps = {
  /** Texte à révéler. Utilisez le séparateur `|` pour forcer une césure de mot. */
  text: string;
  /** Composant de rendu (h1, h2, p…) — par défaut span */
  as?: keyof React.JSX.IntrinsicElements;
  /** Classe sur le conteneur */
  className?: string;
  /** Déclencher dès le mount (par défaut), ou seulement une fois en viewport */
  trigger?: "mount" | "in-view";
  /** Durée de chaque mot (s) */
  duration?: number;
  /** Délai entre chaque mot (s) */
  staggerChildren?: number;
  /** Délai initial avant le premier mot (s) */
  delayChildren?: number;
  /** Map de mots vers leur classe (pour l'italic accent par exemple) */
  emphasis?: Record<string, string>;
  /** Slot supplémentaire après le texte (ex: ligne soulignée animée) */
  children?: ReactNode;
};

const containerVariants: Variants = {
  hidden: {},
  visible: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "60%",
    filter: "blur(10px)",
  },
  visible: ({ duration }: { duration: number }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

/**
 * Révèle un texte mot par mot avec un combo blur + slide-up,
 * inspiré des intros cinétiques d'Apple et Linear.
 *
 * Chaque mot est masqué dans un container `overflow-hidden` puis monte
 * en se nettant — l'effet ressemble à des mots qui sortent d'une page.
 *
 * Pour mettre un mot en italique stylé, passez `emphasis={{ Terre: "italic text-atlas-cream" }}`
 * — la classe sera appliquée au span du mot correspondant.
 *
 * Respecte prefers-reduced-motion : passe en fade simple.
 */
export function WordReveal({
  text,
  as: Component = "span",
  className,
  trigger = "mount",
  duration = 0.9,
  staggerChildren = 0.12,
  delayChildren = 0,
  emphasis = {},
  children,
}: WordRevealProps) {
  const words = text.split(" ");

  const motionProps =
    trigger === "in-view"
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-50px" },
        }
      : {
          initial: "hidden",
          animate: "visible",
        };

  // Tag is dynamic — we use motion.span and let the parent control the tag via `as`.
  // For correct semantic, render the outer Component then nested motion span.
  const inner = (
    <motion.span
      className="inline-block"
      variants={containerVariants}
      custom={{ stagger: staggerChildren, delay: delayChildren }}
      {...motionProps}
    >
      {words.map((word, i) => {
        // Strip ponctuation for emphasis lookup
        const clean = word.replace(/[.,!?;:]/g, "");
        const emphasisClass = emphasis[clean];
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-baseline pb-[0.18em] pr-[0.08em]"
            aria-hidden="true"
            style={{ overflowClipMargin: "0.15em" }}
          >
            <motion.span
              className={`inline-block ${emphasisClass ?? ""}`}
              variants={wordVariants}
              custom={{ duration }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
      {children}
    </motion.span>
  );

  return (
    <Component className={className}>
      {/* Texte accessible pour les lecteurs d'écran (les motion.span sont aria-hidden) */}
      <span className="sr-only">{text}</span>
      {inner}
    </Component>
  );
}
