"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInDown } from "@/lib/animations";
import clsx from "clsx";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  variant?: "loire" | "atlas" | "bridge";
};

const VARIANTS = {
  loire: {
    bg: "linear-gradient(135deg, var(--color-loire-deep) 0%, var(--color-loire-stream) 60%, var(--color-loire-mist) 100%)",
    eyebrow: "text-atlas-cream",
    accent: "text-atlas-saffron",
  },
  atlas: {
    bg: "linear-gradient(135deg, var(--color-atlas-clay) 0%, var(--color-atlas-terracotta) 50%, var(--color-atlas-saffron) 100%)",
    eyebrow: "text-loire-pale",
    accent: "text-atlas-cream",
  },
  bridge: {
    bg: "linear-gradient(120deg, var(--color-loire-deep) 0%, var(--color-atlas-clay) 100%)",
    eyebrow: "text-atlas-cream",
    accent: "text-atlas-saffron",
  },
};

/**
 * Hero compact pour les pages dédiées (non-home).
 * Plus court qu'un Hero complet — laisse la place au contenu.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "loire",
}: PageHeroProps) {
  const v = VARIANTS[variant];

  return (
    <section
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6 overflow-hidden"
      style={{ background: v.bg }}
      aria-label={typeof title === "string" ? title : eyebrow}
    >
      {/* Vignette douce */}
      <div className="absolute inset-0 vignette-soft pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative max-w-4xl mx-auto text-center text-loire-pale"
      >
        <motion.p
          variants={fadeInDown}
          className={clsx(
            "text-[0.65rem] md:text-xs uppercase tracking-[0.4em] font-sans font-medium",
            v.eyebrow,
          )}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="font-serif font-light text-5xl md:text-7xl mt-4 md:mt-5 leading-[1.05]"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-5 md:mt-7 text-base md:text-xl text-loire-pale/90 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
