"use client";

import { motion } from "framer-motion";

/**
 * Carte de parrainage dédiée à Thomas Colombel,
 * N°1 français en paragolf et ambassadeur de l'association.
 */
export function ColombelCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-loire-deep) 0%, var(--color-loire-stream) 50%, var(--color-atlas-clay) 100%)",
      }}
    >
      <div className="relative p-8 md:p-12 text-loire-pale">
        <p className="text-xs uppercase tracking-[0.4em] text-atlas-cream font-sans font-medium">
          Notre parrain
        </p>
        <h3 className="font-serif text-3xl md:text-4xl mt-3 leading-tight">
          Thomas <em className="italic text-atlas-saffron">Colombel</em>
        </h3>
        <p className="mt-2 text-base font-sans italic text-loire-pale/80">
          N°1 français de paragolf
        </p>
        <p className="mt-6 text-loire-pale/90 leading-relaxed max-w-xl">
          Champion engagé pour l'inclusion par le sport, Thomas porte les valeurs
          d'accessibilité et de dépassement qui guident la Maison Bledi. Son
          parrainage relie nos terrains de jeu — du fairway orléanais aux pistes
          du Haut-Atlas.
        </p>
      </div>
      {/* Décor : flèche solidaire */}
      <svg
        className="absolute right-6 top-6 w-12 h-12 opacity-25"
        viewBox="0 0 60 60"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M10,30 L50,30 M40,18 L52,30 L40,42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.aside>
  );
}
