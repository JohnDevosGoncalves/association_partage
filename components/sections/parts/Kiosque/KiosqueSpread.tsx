"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { Partner } from "@/lib/data/products";
import { Lightbox } from "@/components/ui/Lightbox";

type Props = {
  partner: Partner;
  index: number;
  reverse: boolean;
};

/**
 * Spread éditorial pour un partenaire du Kiosque.
 *
 * - 1 hero image (3:4)
 * - Texte éditorial à côté
 * - Si plus d'1 photo : grille de vignettes en dessous
 * - Click sur n'importe quelle photo → lightbox plein écran
 * - Navigation clavier dans la lightbox
 */
export function KiosqueSpread({ partner, index, reverse }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasMultiple = partner.gallery.length > 1;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start",
          reverse && "lg:[direction:rtl]",
        )}
      >
        {/* Image hero — cliquable */}
        <div
          className={clsx(
            "lg:col-span-7",
            reverse && "lg:[direction:ltr]",
          )}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label={`Voir la photo de ${partner.name} en grand`}
            className="group relative block w-full aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden ring-1 ring-loire-pale/8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] cursor-zoom-in"
          >
            <Image
              src={partner.heroImage}
              alt={`${partner.name} — ${partner.craft}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ transitionTimingFunction: "var(--ease-quintet)" }}
              quality={85}
            />
            {/* Index numérique éditorial */}
            <div
              className="absolute top-5 left-6 lg:top-7 lg:left-8 font-serif font-extralight text-loire-pale text-[4rem] md:text-[6rem] lg:text-[7rem] leading-none tabular pointer-events-none"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            {/* Indicateur "click to zoom" subtil */}
            <div
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-loire-pale/15 backdrop-blur-md text-loire-pale flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
              </svg>
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
              }}
            />
          </button>
        </div>

        {/* Texte éditorial */}
        <div
          className={clsx(
            "lg:col-span-5 text-loire-pale",
            reverse && "lg:[direction:ltr]",
          )}
        >
          <p
            className="text-[0.65rem] uppercase tracking-[0.3em] font-sans font-medium mb-3"
            style={{ color: "var(--color-atlas-saffron)" }}
          >
            {partner.city}
            {partner.since && (
              <>
                <span className="mx-2 opacity-50">·</span>
                {partner.since}
              </>
            )}
          </p>
          <h3
            className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-loire-pale leading-[1.05] tracking-[-0.01em]"
            style={{ textWrap: "balance" }}
          >
            {partner.name}
          </h3>
          <p className="mt-2 text-base italic font-serif text-atlas-cream/80">
            {partner.craft}
          </p>

          <div className="my-6 md:my-8 h-px w-16 bg-atlas-saffron" />

          <p
            className="text-base md:text-[1.05rem] text-loire-pale/75 leading-[1.7] font-light max-w-[52ch]"
            style={{ textWrap: "pretty" }}
          >
            {partner.bio}
          </p>

          <div className="mt-7 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-loire-pale/55 font-sans">
            <span className="w-6 h-px bg-loire-pale/30" />
            <span>{partner.contribution}</span>
          </div>
        </div>
      </motion.article>

      {/* Galerie additionnelle — toutes les photos restantes */}
      {hasMultiple && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {/* On affiche TOUTES les photos restantes (sauf la hero qui est déjà au-dessus) */}
          {partner.gallery.slice(1).map((photo, j) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(j + 1)}
              aria-label={`Voir : ${photo.caption}`}
              className="group relative aspect-[4/5] rounded-[1rem] overflow-hidden ring-1 ring-loire-pale/8 cursor-zoom-in"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 50vw, 22vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ transitionTimingFunction: "var(--ease-quintet)" }}
                quality={80}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              <span className="absolute bottom-2.5 left-3 text-[0.55rem] uppercase tracking-[0.2em] text-loire-pale font-sans pointer-events-none">
                {photo.caption}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Lightbox pour ce partenaire */}
      <Lightbox
        photos={partner.gallery.map((p) => ({
          src: p.src,
          alt: p.caption,
          caption: p.caption,
        }))}
        index={lightboxIndex}
        onChange={setLightboxIndex}
      />
    </>
  );
}
