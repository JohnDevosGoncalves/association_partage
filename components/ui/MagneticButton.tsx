"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  /** Force du magnétisme — fraction du déplacement curseur appliquée au bouton (0.15-0.4) */
  strength?: number;
  /** Classe Tailwind du bouton */
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "ref">;

/**
 * Bouton qui s'incline vers le curseur quand on passe à proximité.
 *
 * Détail premium qu'on remarque au survol — utilisé par Apple, Vercel, Linear
 * pour leurs CTAs principaux. Subtil sur PC, désactivé sur mobile (event tactile).
 *
 * Combine deux ressorts : un pour le bouton entier (mouvement doux), un pour
 * le contenu interne (mouvement amplifié) — ça donne l'impression de
 * profondeur 3D sans 3D library.
 *
 * Respecte prefers-reduced-motion.
 */
export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton(
    { href, children, strength = 0.25, className, ...rest },
    ref,
  ) {
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring sur le bouton — mouvement doux (mass + damping élevés)
    const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });

    // Spring sur le contenu interne — léger overshoot (mass plus faible)
    const contentSpringX = useSpring(x, {
      stiffness: 200,
      damping: 18,
      mass: 0.25,
    });
    const contentSpringY = useSpring(y, {
      stiffness: 200,
      damping: 18,
      mass: 0.25,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      x.set(offsetX * strength);
      y.set(offsetY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{ x: springX, y: springY }}
        className="inline-block"
        data-magnetic="root"
      >
        <Link
          href={href}
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={className}
          data-magnetic-target="true"
          {...rest}
        >
          <motion.span
            style={{ x: contentSpringX, y: contentSpringY }}
            className="inline-flex items-center justify-center w-full h-full"
          >
            {children}
          </motion.span>
        </Link>
      </motion.div>
    );
  },
);
