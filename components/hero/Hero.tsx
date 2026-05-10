"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { LOIRE_LAYERS, ATLAS_LAYERS } from "@/lib/data/heroAssets";

/**
 * Hero photoréaliste — voyage parallaxe d'Orléans au Haut-Atlas.
 *
 * Hiérarchie design (audit UX 2026-05-10) :
 *  1. TrustBadge "Reconnue d'intérêt général · 66 % réduction fiscale"
 *  2. Eyebrow "Association Partage · Depuis 2015"
 *  3. H1 "Entre Terre et Loire" (cinétique, stagger)
 *  4. Subtitle factuel court
 *  5. HeroStats : 3 chiffres-clés (2015 · 130 m² PMR · 3 pays)
 *  6. CTA primaire "Soutenir notre mission" (saffron, plein) → /mecenat
 *  7. CTA secondaire "Notre histoire" (outline, ghost) → /histoire
 */

const HERO_STATS = [
  { value: "2015", label: "Création de l'association" },
  { value: "130 m²", label: "Centre PMR au Haut-Atlas" },
  { value: "3 pays", label: "France · Maroc · Sri Lanka" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Le bloc texte se soulève légèrement au scroll (effet "voyage")
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const textOpacity = useTransform(scrollY, [0, 400, 700], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[100svh] min-h-[680px]"
      aria-label="Bienvenue chez Association Partage"
    >
      {/* Côté Loire — moitié gauche, calques empilés */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        {LOIRE_LAYERS.map((layer, i) => (
          <ParallaxLayer
            key={`loire-${i}`}
            asset={layer}
            range={120 + i * 40}
            direction="up"
            zIndex={i + 1}
            priority={i === 0}
          />
        ))}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,91,0.55) 0%, rgba(27,58,91,0.25) 40%, rgba(27,58,91,0.65) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Côté Atlas — moitié droite */}
      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        {ATLAS_LAYERS.map((layer, i) => (
          <ParallaxLayer
            key={`atlas-${i}`}
            asset={layer}
            range={120 + i * 40}
            direction="up"
            zIndex={i + 1}
            priority={i === 0}
          />
        ))}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(139,58,42,0.45) 0%, rgba(200,85,61,0.20) 40%, rgba(139,58,42,0.55) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Pont central morphing */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[18vw] min-w-[180px] max-w-[320px] z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 morph-bridge opacity-60"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 90% at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 90% at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Vignette globale */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Contenu — par-dessus les deux mondes */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-5 md:px-6 text-center pt-24 md:pt-0"
      >
        {/* TRUST BADGE — réassurance fiscale immédiate */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-5 md:mb-7"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bridge-cream/12 backdrop-blur-md border border-loire-pale/30 text-[0.6rem] md:text-xs tracking-[0.2em] uppercase text-loire-pale font-sans">
            <span
              className="w-1.5 h-1.5 rounded-full bg-atlas-saffron animate-pulse"
              aria-hidden="true"
            />
            Reconnue d'intérêt général · 66 % de réduction fiscale
          </span>
        </motion.div>

        {/* EYEBROW */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-[0.55rem] md:text-[0.7rem] tracking-[0.45em] uppercase text-loire-pale/80 font-sans mb-3 md:mb-4"
        >
          Association Partage · Depuis 2015
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-loire-pale leading-[0.95] text-[3rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] max-w-5xl"
          style={{ textShadow: "0 6px 32px rgba(0,0,0,0.6)" }}
        >
          Entre <em className="italic text-atlas-cream">Terre</em>
          <br />
          et <em className="italic text-loire-mist">Loire</em>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-loire-pale font-sans font-light leading-relaxed px-2"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
        >
          Un pont solidaire d'Orléans au Haut-Atlas, né d'un geste pour la
          scolarisation au Sri Lanka.
        </motion.p>

        {/* HERO STATS — 3 chiffres-clés visibles immédiatement */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-7 md:mt-10 grid grid-cols-3 gap-4 md:gap-10 max-w-2xl w-full"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.value}
              className="text-center px-2 first:border-l-0 md:border-l md:border-loire-pale/20"
            >
              <dt className="font-serif text-2xl md:text-4xl font-light text-loire-pale leading-none">
                {stat.value}
              </dt>
              <dd className="mt-2 text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-loire-pale/70 font-sans leading-snug">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* CTAs — primaire "Soutenir" en premier (audit #4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-7 md:mt-10 flex flex-col-reverse sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            href="/histoire"
            className="inline-flex items-center justify-center px-7 md:px-9 py-3.5 border border-loire-pale/60 hover:border-atlas-cream hover:bg-loire-pale/10 text-loire-pale font-sans font-medium tracking-wide text-sm md:text-base rounded-full transition-all duration-500 backdrop-blur-md"
          >
            Notre histoire
          </Link>
          <Link
            href="/mecenat"
            className="group inline-flex items-center justify-center px-7 md:px-9 py-3.5 bg-atlas-saffron hover:bg-atlas-cream text-bridge-ink font-sans font-semibold tracking-wide text-sm md:text-base rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            Soutenir notre mission
            <span className="ml-2 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Indicateur scroll — discret, masqué sur très petit écran */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="hidden sm:flex absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-loire-pale/60"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] tracking-[0.3em] uppercase font-sans">
            Le voyage commence
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 md:h-10 bg-gradient-to-b from-loire-pale/70 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
