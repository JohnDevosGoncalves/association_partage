"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import Image from "next/image";

export type LightboxPhoto = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  photos: LightboxPhoto[];
  /** Index courant (null = fermé) */
  index: number | null;
  /** Setter pour changer l'index ou fermer (null) */
  onChange: (next: number | null) => void;
};

/**
 * Visionneuse photo plein écran haute qualité.
 *
 * Comportement :
 *  - Modal fixé en plein écran avec backdrop sombre flou
 *  - Photo en object-contain pour ne pas la déformer
 *  - Navigation : flèches clavier (← →), touches/boutons UI
 *  - Fermeture : Esc, clic backdrop, bouton ×
 *  - Caption affichée en bas si fournie
 *  - Compteur "1/4" en haut à droite si > 1 photo
 *
 * Bloque le scroll de la page tant qu'elle est ouverte.
 */
export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const isOpen = index !== null;
  const current = isOpen ? photos[index] : null;

  const close = useCallback(() => onChange(null), [onChange]);
  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % photos.length);
  }, [index, photos.length, onChange]);
  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onChange]);

  // Clavier : Esc / flèches
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  // Bloque le scroll body
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photo"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-2xl"
          onClick={close}
        >
          {/* Bouton fermer */}
          <button
            type="button"
            onClick={close}
            aria-label="Fermer la visionneuse"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-12 h-12 rounded-full bg-loire-pale/10 hover:bg-loire-pale/25 text-loire-pale flex items-center justify-center transition-colors backdrop-blur-md"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>

          {/* Compteur (si plusieurs photos) */}
          {photos.length > 1 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-loire-pale/70 font-sans text-xs tracking-[0.3em] uppercase">
              <span className="text-loire-pale font-medium tabular">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-2">/</span>
              <span className="tabular">{String(photos.length).padStart(2, "0")}</span>
            </div>
          )}

          {/* Bouton précédent */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Photo précédente"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-loire-pale/10 hover:bg-loire-pale/25 text-loire-pale flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Bouton suivant */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Photo suivante"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-loire-pale/10 hover:bg-loire-pale/25 text-loire-pale flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image courante */}
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-[92vw] h-[80vh] md:w-[88vw] md:h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="92vw"
              priority
              quality={95}
              className="object-contain"
            />
          </motion.div>

          {/* Caption */}
          {current.caption && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 max-w-2xl px-6 text-center">
              <p className="font-serif italic text-loire-pale/95 text-base md:text-xl leading-snug">
                {current.caption}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
