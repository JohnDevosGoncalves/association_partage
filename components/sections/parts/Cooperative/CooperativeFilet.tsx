"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * CooperativeFilet — Client leaf.
 *
 * Petit filet décoratif (1px × 64px) qui s'étire de gauche à droite
 * au scroll-in (scaleX 0 → 1). Extrait en sub-client pour permettre
 * à CooperativeSection de rester un Server Component.
 */
export function CooperativeFilet() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: reduceMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: reduceMotion ? 0 : 1.2,
        delay: 0.4,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="my-6 md:my-7 h-px w-16 bg-atlas-clay origin-left"
    />
  );
}
