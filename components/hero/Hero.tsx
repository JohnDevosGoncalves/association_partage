"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { LOIRE_LAYERS, ATLAS_LAYERS } from "@/lib/data/heroAssets";
import { WordReveal } from "@/components/ui/WordReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { ArrowIcon } from "@/components/ui/IconButton";

/**
 * Hero — Editorial Split asymétrique (per soft-skill §3 Layout Archetype #3).
 *
 * Layout :
 *  - Mobile : full-width, texte d'abord, collage photos en-dessous
 *  - Desktop : 50/50 split — texte aligné GAUCHE (anti-center bias),
 *              collage photos asymétrique à droite (3 photos en cascade)
 *
 * Typographie : Cormorant pour H1 (serif éditorial), Geist pour le body
 * (sans-serif premium remplaçant Inter, banni par taste-skill §7).
 *
 * Patterns appliqués :
 *  - Eyebrow pill badge avant H1 (soft §4C)
 *  - Button-in-Button trailing icons (soft §4B)
 *  - Tabular-nums sur les chiffres
 *  - text-wrap balance natif via globals.css
 *  - Spring physics sur les motion.divs
 *  - min-h-[100dvh] (jamais h-screen)
 */

const HERO_STATS = [
  { value: "2015", label: "Création" },
  { value: "130 m²", label: "Centre PMR" },
  { value: "3 pays", label: "France · Maroc · Sri Lanka" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Légère parallaxe sur le bloc image (collage)
  const collageY = useTransform(scrollY, [0, 800], [0, -120]);
  const collageOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);
  // Le texte se soulève
  const textY = useTransform(scrollY, [0, 600], [0, -60]);
  const textOpacity = useTransform(scrollY, [0, 400, 700], [1, 1, 0]);

  // 3 photos pour le collage (mix Loire + Atlas pour symboliser le pont)
  const collageImages = [
    { ...LOIRE_LAYERS[2], gridArea: "main", aspectRatio: "3/4" },
    { ...ATLAS_LAYERS[1], gridArea: "side", aspectRatio: "4/5" },
    { ...ATLAS_LAYERS[0], gridArea: "accent", aspectRatio: "1/1" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[100dvh]"
      aria-label="Bienvenue chez Association Partage"
      style={{
        background:
          "radial-gradient(ellipse at top left, #f1ecdf 0%, #f8f4ed 40%, #ede4cf 100%)",
      }}
    >
      {/* Texture subtile en filigrane */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(122,156,184,0.18), transparent 40%), radial-gradient(circle at 80% 100%, rgba(232,163,61,0.18), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[100dvh]">
        {/* COLONNE TEXTE — gauche (lg:col-span-7) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-7 flex flex-col"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <EyebrowBadge variant="bridge">
              Association Partage · Depuis 2015
            </EyebrowBadge>
          </motion.div>

          {/* H1 — révélation cinétique mot par mot, ALIGNÉ GAUCHE */}
          <h1
            className="font-serif font-light text-bridge-ink leading-[0.92] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] tracking-[-0.02em]"
            style={{ textWrap: "balance" }}
          >
            <WordReveal
              text="Entre Terre"
              duration={1.0}
              staggerChildren={0.18}
              delayChildren={0.4}
              emphasis={{ Terre: "italic font-extralight text-atlas-clay" }}
            />
            <br />
            <WordReveal
              text="et Loire"
              duration={1.0}
              staggerChildren={0.18}
              delayChildren={0.95}
              emphasis={{ Loire: "italic font-extralight text-loire-deep" }}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.6, ease: [0.32, 0.72, 0, 1] }}
            className="mt-6 md:mt-8 max-w-[58ch] text-base md:text-lg lg:text-xl text-bridge-ink/75 font-sans font-light leading-[1.55]"
          >
            Un pont solidaire d'Orléans au Haut-Atlas, né en 2015 d'un geste
            pour la scolarisation au Sri Lanka. Aujourd'hui : un centre PMR
            autosuffisant, une coopérative bio, un kiosque gastronomique.
          </motion.p>

          {/* Stats inline avec tabular-nums */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.85 }}
            className="mt-10 md:mt-12 flex flex-wrap gap-x-10 md:gap-x-14 gap-y-6"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.value} className="flex flex-col">
                <dt className="font-serif text-3xl md:text-4xl font-light text-bridge-ink leading-none tabular">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[0.65rem] md:text-xs uppercase tracking-[0.18em] text-bridge-ink/55 font-sans">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* CTAs avec Button-in-Button trailing icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <MagneticButton
              href="/mecenat"
              strength={0.3}
              className="group relative inline-flex items-center justify-between px-2 py-2 pl-7 bg-bridge-ink hover:bg-atlas-clay text-bridge-cream font-sans font-medium tracking-[-0.01em] text-sm md:text-base rounded-full active:scale-[0.98] transition-[background-color,transform] duration-500"
            >
              <span className="relative z-10">Soutenir notre mission</span>
              <ArrowIcon size={36} variant="ghost" />
            </MagneticButton>

            <Link
              href="/histoire"
              className="group inline-flex items-center px-7 py-3.5 text-bridge-ink hover:text-atlas-clay font-sans font-medium tracking-[-0.01em] text-sm md:text-base transition-colors duration-500"
            >
              <span className="border-b border-bridge-ink/30 group-hover:border-atlas-clay/60 pb-0.5 transition-colors duration-500">
                Notre histoire
              </span>
              <span
                aria-hidden="true"
                className="ml-2 transition-transform duration-500 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-quintet)" }}
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* COLONNE COLLAGE PHOTOS — droite (lg:col-span-5) */}
        <motion.div
          style={{ y: collageY, opacity: collageOpacity }}
          className="lg:col-span-5 relative h-[55vh] sm:h-[65vh] lg:h-[78vh] w-full"
        >
          {/* Photo principale (Pont Royal) — large, en bas à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: 0.6,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute right-0 bottom-0 w-[70%] aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(27,58,91,0.35)] z-20"
          >
            <Image
              src={collageImages[0].src}
              alt={collageImages[0].alt}
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 30vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(27,58,91,0) 0%, rgba(27,58,91,0.25) 100%)",
              }}
            />
          </motion.div>

          {/* Photo Atlas (mid) — décalée en haut à gauche, qui chevauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: 0.85,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute left-0 top-[8%] w-[58%] aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(139,58,42,0.35)] z-10"
          >
            <Image
              src={collageImages[1].src}
              alt={collageImages[1].alt}
              fill
              priority
              sizes="(max-width: 1024px) 58vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          {/* Photo accent (sommets enneigés) — petit, milieu droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.4,
              delay: 1.1,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute right-[8%] top-[4%] w-[38%] aspect-square rounded-[1rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(232,163,61,0.3)] z-30 ring-1 ring-bridge-cream"
          >
            <Image
              src={collageImages[2].src}
              alt={collageImages[2].alt}
              fill
              sizes="(max-width: 1024px) 38vw, 18vw"
              className="object-cover"
            />
          </motion.div>

          {/* Annotation flottante — référence cartographique */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute left-2 bottom-4 z-40 max-w-[140px]"
            aria-hidden="true"
          >
            <div className="text-[0.55rem] uppercase tracking-[0.3em] text-bridge-ink/50 font-sans mb-1">
              47.9°N · 31.0°N
            </div>
            <div className="font-serif italic text-sm text-bridge-ink/70 leading-tight">
              Deux latitudes, un pont
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur scroll discret — en bas, hors layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-3 text-bridge-ink/40"
        aria-hidden="true"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase font-sans">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-bridge-ink/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
