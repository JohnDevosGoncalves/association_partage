"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = [
  {
    src: "/images/atlas/village-pise.jpg",
    alt: "Village berbère en pisé ocre sur flanc de colline avec terrasses cultivées",
    caption: "Le village voisin — pisé ocre et terrasses",
    span: "col-span-12 md:col-span-7 row-span-2",
  },
  {
    src: "/images/atlas/cascade-oasis.jpg",
    alt: "Cascade dans canyon, palmiers et eau émeraude au pied de falaises rouges",
    caption: "L'oasis — cascade dans le canyon",
    span: "col-span-6 md:col-span-5",
  },
  {
    src: "/images/atlas/riviere-heron.jpg",
    alt: "Rivière aux roches ocre avec une aigrette blanche posée sur un rocher",
    caption: "L'oued — l'aigrette de l'eau",
    span: "col-span-6 md:col-span-5",
  },
  {
    src: "/images/atlas/ecureuil-berberie.jpg",
    alt: "Écureuil de Berbérie dans les herbes sèches dorées",
    caption: "L'écureuil de Berbérie",
    span: "col-span-6 md:col-span-6",
  },
  {
    src: "/images/atlas/agame-rocher.jpg",
    alt: "Lézard agame bleu-vert posé sur un rocher rouge",
    caption: "L'agame — gardien des rochers",
    span: "col-span-6 md:col-span-6",
  },
];

/**
 * Galerie écosystème Atlas — 5 photos en masonry asymétrique cliquables.
 * Tout est cliquable → lightbox plein écran avec navigation.
 */
export function EcosystemeGallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
      >
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Voir en grand : ${photo.caption}`}
            className={`relative ${photo.span} rounded-[1rem] overflow-hidden group cursor-zoom-in`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                i === 0
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 768px) 50vw, 30vw"
              }
              quality={65}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ transitionTimingFunction: "var(--ease-quintet)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <figcaption className="absolute bottom-3 left-4 md:bottom-4 md:left-5 text-loire-pale text-[0.6rem] md:text-xs uppercase tracking-[0.25em] font-sans pointer-events-none">
              {photo.caption.split(" — ")[0]}
            </figcaption>
            <span
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-loire-pale/15 backdrop-blur-md text-loire-pale flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
              </svg>
            </span>
          </button>
        ))}
      </motion.div>

      <Lightbox photos={PHOTOS} index={index} onChange={setIndex} />
    </>
  );
}
