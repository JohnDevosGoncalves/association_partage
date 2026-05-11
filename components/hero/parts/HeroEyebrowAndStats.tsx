"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "2015", label: "Création de l'association" },
  { value: "130 m²", label: "Centre PMR au Haut-Atlas" },
  { value: "3 pays", label: "France · Maroc · Sri Lanka" },
];

/**
 * Sub-clients du Hero — eyebrow + subtitle + stats.
 * Couleurs en loire-pale pour ressortir sur la photo background.
 */
export function HeroEyebrowAndStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-6 md:mb-8"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-loire-pale/15 ring-1 ring-loire-pale/30 text-loire-pale px-3 py-1 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.25em] font-sans font-medium backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="w-1 h-1 rounded-full bg-atlas-saffron"
        />
        Association Partage · Depuis 2015
      </span>
    </motion.div>
  );
}

export function HeroSubtitle() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 1.6, ease: [0.32, 0.72, 0, 1] }}
      className="mt-6 md:mt-8 max-w-[58ch] text-base md:text-lg lg:text-xl text-loire-pale/90 font-sans font-light leading-[1.55]"
      style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
    >
      Un pont solidaire d'Orléans au Haut-Atlas, né en 2015 d'un geste pour la
      scolarisation au Sri Lanka. Aujourd'hui : un centre PMR autosuffisant,
      une coopérative bio, un kiosque gastronomique.
    </motion.p>
  );
}

export function HeroStats() {
  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.85, ease: [0.32, 0.72, 0, 1] }}
      className="mt-10 md:mt-12 flex flex-wrap gap-x-10 md:gap-x-14 gap-y-6"
    >
      {STATS.map((stat) => (
        <div key={stat.value} className="flex flex-col">
          <dt
            className="font-serif text-3xl md:text-4xl font-light text-loire-pale leading-none"
            style={{
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            {stat.value}
          </dt>
          <dd
            className="mt-1.5 text-[0.65rem] md:text-xs uppercase tracking-[0.18em] text-loire-pale/75 font-sans"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {stat.label}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
