"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Indicateur de progression du scroll — filet vertical fixé à droite
 * de la viewport. Se remplit du haut vers le bas au fur et à mesure
 * que l'utilisateur descend dans la page.
 *
 * Pensé pour signaler le "voyage" sans concurrencer le contenu :
 *  - Hairline 2px, accent saffron très subtil au repos (15% opacité)
 *  - Remplissage plein orange en haut, dégradé vers transparent
 *  - Spring physics pour un mouvement organique (damping/stiffness)
 *  - Masqué sur mobile (< md) pour préserver l'espace écran
 *
 * Z-index entre le grain (1) et la navbar (50) — toujours visible
 * au-dessus du contenu mais sous les modales.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });

  return (
    <div
      className="hidden md:block fixed top-0 right-6 lg:right-10 w-px h-screen z-[40] pointer-events-none"
      aria-hidden="true"
    >
      {/* Rail discret en arrière-plan */}
      <div className="absolute inset-0 bg-bridge-ink/8" />

      {/* Progress fill */}
      <motion.div
        style={{
          scaleY,
          transformOrigin: "top",
          background:
            "linear-gradient(180deg, var(--color-atlas-saffron) 0%, var(--color-atlas-terracotta) 60%, transparent 100%)",
        }}
        className="absolute inset-0"
      />

      {/* Point indicateur en bas du progress */}
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top"
      >
        <div
          className="absolute -right-[3px] bottom-0 w-[7px] h-[7px] rounded-full bg-atlas-saffron"
          style={{
            boxShadow:
              "0 0 12px var(--color-atlas-saffron), 0 0 4px rgba(255,255,255,0.4)",
            transform: "translateY(50%)",
          }}
        />
      </motion.div>
    </div>
  );
}
