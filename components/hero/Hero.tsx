"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ParallaxLayer } from "@/components/parallax/ParallaxLayer";
import { LOIRE_LAYERS, ATLAS_LAYERS } from "@/lib/data/heroAssets";

/**
 * Hero photoréaliste — voyage parallaxe d'Orléans au Haut-Atlas.
 *
 * Structure :
 *  • 3 calques Loire (côté gauche)        : arrière-plan / brume / arches Pont Royal
 *  • 3 calques Atlas (côté droit)         : sommets / pisé ocre / oliviers
 *  • Voile sombre central pour ancrer le titre
 *  • Texte minimaliste avec parallaxe inverse (monte légèrement avec le scroll)
 *
 * Photos : Unsplash CC0 (libres de droits) servant de placeholders.
 * Pour remplacer : voir lib/data/heroAssets.ts.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-progress local à la section pour synchro fine
  const { scrollY } = useScroll();

  // Le bloc texte se soulève légèrement au scroll (effet "voyage")
  const textY = useTransform(scrollY, [0, 600], [0, -80]);
  const textOpacity = useTransform(scrollY, [0, 400, 700], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[100svh] min-h-[640px]"
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
        {/* Voile froid pour unifier les 3 calques Loire */}
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
        {/* Voile chaud pour unifier les 3 calques Atlas */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(139,58,42,0.45) 0%, rgba(200,85,61,0.20) 40%, rgba(139,58,42,0.55) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Pont central morphing — bande verticale qui fait la couture */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[18vw] min-w-[180px] max-w-[320px] z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 morph-bridge opacity-60" style={{
          maskImage:
            "radial-gradient(ellipse 70% 90% at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 90% at center, black 30%, transparent 75%)",
        }} />
      </div>

      {/* Vignette globale pour ancrer le titre */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bloc texte — se soulève au scroll */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-30 flex flex-col items-center justify-center h-full px-5 md:px-6 text-center pt-20 md:pt-0"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[0.6rem] md:text-xs tracking-[0.4em] uppercase text-loire-pale/90 font-sans mb-4 md:mb-6"
        >
          Association Partage · Depuis 2015
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-loire-pale leading-[0.95] text-[3rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] max-w-5xl"
          style={{ textShadow: "0 6px 32px rgba(0,0,0,0.55)" }}
        >
          Entre <em className="italic text-atlas-cream">Terre</em>
          <br />
          et <em className="italic text-loire-mist">Loire</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-5 md:mt-8 max-w-2xl text-sm sm:text-lg md:text-xl text-loire-pale font-sans font-light leading-relaxed px-2"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          Depuis 2015, un pont solidaire d'Orléans au Haut-Atlas — né d'un
          geste pour la scolarisation au Sri Lanka, devenu une maison.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link
            href="/histoire"
            className="group inline-flex items-center justify-center px-7 md:px-9 py-3.5 bg-atlas-saffron hover:bg-atlas-cream text-bridge-ink font-sans font-medium tracking-wide text-sm md:text-base rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            Notre histoire
            <span className="ml-2 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/mecenat"
            className="inline-flex items-center justify-center px-7 md:px-9 py-3.5 border border-loire-pale/70 hover:bg-loire-pale/10 text-loire-pale font-sans font-medium tracking-wide text-sm md:text-base rounded-full transition-all duration-500 backdrop-blur-md"
          >
            Devenir mécène
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="hidden sm:flex absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-loire-pale/70"
          aria-hidden="true"
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase font-sans">
            Le voyage commence
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-loire-pale/80 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
