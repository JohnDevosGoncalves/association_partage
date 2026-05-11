"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const BANNER = {
  src: "/images/sri-lanka/groupe-classe.jpg",
  alt: "Groupe d'enfants sri-lankais en uniforme et bénévoles — bras levés en V de victoire",
  caption: "Le V de victoire — fin de cérémonie de rentrée",
};

const VIGNETTES = [
  {
    src: "/images/sri-lanka/groupe-cartables.jpg",
    alt: "Remise des cartables aux enfants",
    caption: "La remise des cartables",
  },
  {
    src: "/images/sri-lanka/enfant-merci.jpg",
    alt: "Échange thumbs-up entre une élève et un bénévole",
    caption: "Le merci",
  },
  {
    src: "/images/sri-lanka/enseignante-cadeau.jpg",
    alt: "Enseignante tenant un cartable noir et un cadeau",
    caption: "L'enseignante",
  },
  {
    src: "/images/sri-lanka/medaille-merci.jpg",
    alt: "Femme et bénévole brandissant une médaille de remerciement",
    caption: "La médaille",
  },
];

const ALL_PHOTOS = [BANNER, ...VIGNETTES];

/**
 * Galerie Sri Lanka cliquable — 1 banner pleine largeur + 4 vignettes.
 * Tout est cliquable, ouvre la lightbox sur 5 photos.
 */
export function SriLankaGallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      {/* Bandeau hero cliquable */}
      <motion.button
        type="button"
        onClick={() => setIndex(0)}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        aria-label="Voir la photo en grand : Le V de victoire"
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] overflow-hidden mb-16 md:mb-24 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] group cursor-zoom-in"
      >
        <Image
          src={BANNER.src}
          alt={BANNER.alt}
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          quality={82}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ transitionTimingFunction: "var(--ease-quintet)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute bottom-5 left-5 md:bottom-10 md:left-12 max-w-lg text-loire-pale text-left">
          <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] font-sans font-medium opacity-85">
            Sri Lanka · Opération Cartable
          </p>
          <p
            className="font-serif italic text-xl md:text-3xl lg:text-4xl mt-2 leading-tight"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            «&nbsp;Tout commence par un cartable.&nbsp;»
          </p>
          <p className="mt-3 text-[0.7rem] md:text-sm font-sans text-loire-pale/75 leading-relaxed max-w-md">
            Depuis 2015, chaque rentrée scolaire, 30 enfants reçoivent leurs
            fournitures, leur transport et leur dignité.
          </p>
        </div>
        <div
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-loire-pale/15 backdrop-blur-md text-loire-pale flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </div>
      </motion.button>

      {/* Galerie 4 vignettes */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-16 md:mb-24"
      >
        {VIGNETTES.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i + 1)}
            aria-label={`Voir en grand : ${photo.caption}`}
            className="group relative aspect-[4/5] rounded-[1rem] overflow-hidden cursor-zoom-in"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={78}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              style={{ transitionTimingFunction: "var(--ease-quintet)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <figcaption className="absolute bottom-3 left-4 text-loire-pale text-[0.6rem] uppercase tracking-[0.25em] font-sans pointer-events-none">
              {photo.caption}
            </figcaption>
          </button>
        ))}
      </motion.div>

      <Lightbox photos={ALL_PHOTOS} index={index} onChange={setIndex} />
    </>
  );
}
