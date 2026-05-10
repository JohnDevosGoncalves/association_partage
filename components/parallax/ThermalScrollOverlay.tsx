"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Voile global qui se teinte progressivement du froid (bleu Loire) au
 * chaud (terracotta Atlas) au fil du scroll de la page d'accueil.
 *
 * Subtil mais fondateur de l'identité "voyage thermique" du brief.
 * Reste fixe par-dessus le contenu, en mode `mix-blend-mode: multiply`
 * pour ne pas masquer mais teinter.
 */
export function ThermalScrollOverlay() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [
      "rgba(27, 58, 91, 0)",       // début : transparent (laisse voir Loire)
      "rgba(45, 90, 130, 0.05)",   // froid léger
      "rgba(181, 130, 74, 0.08)",  // bascule ocre
      "rgba(200, 85, 61, 0.10)",   // chaud terracotta
      "rgba(139, 58, 42, 0.05)",   // chaud profond, atténué pour le footer
    ],
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="fixed inset-0 pointer-events-none z-[5] mix-blend-multiply"
      aria-hidden="true"
    />
  );
}
