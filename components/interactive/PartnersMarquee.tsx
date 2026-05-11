"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import {
  EXTENDED_PARTNERS,
  getPartnerLogoSrc,
  WHITE_PARTNER_LOGOS,
} from "@/lib/data/partners-extended";

type PartnersMarqueeProps = {
  /** Durée d'un cycle complet en secondes. */
  duration?: number;
  /** Hauteur du logo en px. */
  logoHeight?: number;
};

/**
 * Bandeau marquee infini des logos partenaires.
 *
 * Variante visuelle du Marquee texte : ici on défile les 16 logos avec une
 * hauteur uniforme et un espacement régulier. Pause au hover. Lien explicite
 * vers /partenaires en titre de section pour la découverte complète.
 */
export function PartnersMarquee({
  duration = 60,
  logoHeight = 44,
}: PartnersMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  const items = EXTENDED_PARTNERS.filter((p) => getPartnerLogoSrc(p.slug));
  const sequence = [...items, ...items];

  return (
    <section
      className="relative w-full py-12 md:py-16 bg-bridge-cream/60 border-y border-atlas-ochre/15"
      aria-labelledby="partners-marquee-title"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-6 mb-8 md:mb-10 flex items-baseline justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium">
            Notre écosystème
          </p>
          <h2
            id="partners-marquee-title"
            className="font-serif text-2xl md:text-4xl text-bridge-ink mt-3 leading-tight font-light tracking-tight"
          >
            Ils <em className="italic text-atlas-saffron">soutiennent</em>{" "}
            l'association
          </h2>
        </div>
        <Link
          href="/partenaires"
          className="inline-flex items-baseline gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-atlas-clay hover:text-atlas-terracotta font-sans font-medium transition-colors"
        >
          Voir tous nos partenaires
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        className="group/marquee relative w-full overflow-hidden"
        aria-label="Logos défilants des partenaires"
      >
        {/* Masques latéraux pour fade-out */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--color-bridge-cream) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
          style={{
            background:
              "linear-gradient(270deg, var(--color-bridge-cream) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="flex items-center gap-12 md:gap-20 whitespace-nowrap will-change-transform group-hover/marquee:[animation-play-state:paused]"
          animate={
            shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  x: { duration, repeat: Infinity, ease: "linear" },
                }
          }
        >
          {sequence.map((p, i) => {
            const src = getPartnerLogoSrc(p.slug)!;
            const isWhite = WHITE_PARTNER_LOGOS.has(p.slug);
            return (
              <a
                key={`${p.slug}-${i}`}
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="shrink-0 inline-flex items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={src}
                  alt={p.name}
                  height={logoHeight}
                  width={logoHeight * 3}
                  className={clsx(
                    "object-contain w-auto",
                    isWhite && "brightness-0",
                  )}
                  style={{ height: logoHeight }}
                  unoptimized
                />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
