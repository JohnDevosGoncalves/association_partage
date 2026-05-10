"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Distance Y (px) du déplacement initial — défaut 30 */
  y?: number;
  /** Durée de l'animation — défaut 0.9s */
  duration?: number;
  /** Désactiver le blur initial */
  noBlur?: boolean;
  /** className passée au wrapper */
  className?: string;
  /** Élément HTML wrapper — défaut div */
  as?: "div" | "section" | "article" | "li" | "ul" | "ol" | "header" | "p";
};

/**
 * Wrapper "fade-up + blur" déclenché à l'entrée dans le viewport.
 *
 * Pattern central pour décharger les Server Components du poids Framer Motion :
 * un Server Component peut wrapper du JSX statique dans <Reveal> sans devenir
 * lui-même client. Seule cette feuille est hydratée.
 *
 * Easing : cubic-bezier(0.32, 0.72, 0, 1) (ease-quintet, aligné sur le site).
 * Respecte prefers-reduced-motion via useReducedMotion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.9,
  noBlur = false,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y,
          filter: noBlur ? "none" : "blur(8px)",
        },
    visible: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
