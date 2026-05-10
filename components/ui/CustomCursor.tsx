"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Curseur custom minimaliste — desktop uniquement.
 *
 * Comportement :
 *  • Petit cercle qui suit le curseur avec un léger lag (spring)
 *  • Un anneau plus large qui suit avec un lag plus marqué (effet "halo")
 *  • Sur les éléments interactifs (a, button, [data-magnetic-target]),
 *    l'anneau s'agrandit et devient saffron — signal "ici tu peux cliquer"
 *  • Disparaît quand le curseur quitte la fenêtre
 *  • Désactivé si pointeur tactile détecté (CSS @media)
 *
 * Le curseur natif reste visible — on ajoute juste cette couche au-dessus.
 * C'est volontaire : le natif assure l'accessibilité, le custom apporte la signature.
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Petit point — quasi-instantané
  const dotSpringConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // Halo — lag plus long pour un effet "queue de comète"
  const haloSpringConfig = { damping: 22, stiffness: 200, mass: 0.4 };
  const haloX = useSpring(cursorX, haloSpringConfig);
  const haloY = useSpring(cursorY, haloSpringConfig);

  useEffect(() => {
    // Détection capacité hover (pas de tactile)
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(mql.matches);
    const onChange = () => setSupportsHover(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!supportsHover) return;

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    // Détecte si on survole un élément interactif
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, textarea, [data-magnetic-target], [role="button"]',
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [supportsHover, cursorX, cursorY]);

  if (!supportsHover) return null;

  return (
    <>
      {/* Halo (cercle large, color shift sur hover) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering
              ? "rgba(232, 163, 61, 0.22)"
              : "rgba(241, 236, 223, 0.10)",
            borderColor: isHovering
              ? "rgba(232, 163, 61, 0.7)"
              : "rgba(241, 236, 223, 0.55)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full border backdrop-blur-sm"
        />
      </motion.div>

      {/* Petit point central */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full bg-atlas-saffron"
        />
      </motion.div>
    </>
  );
}
