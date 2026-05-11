"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = Omit<ImageProps, "src"> & {
  /** Chemin local cible (ex: "/images/atlas/X.jpg") */
  src: string;
  /** URL de fallback affichée si l'image principale renvoie une erreur */
  fallbackSrc: string;
};

/**
 * Image robuste avec fallback automatique.
 *
 * Tente d'abord d'afficher `src` (typiquement une photo locale dans
 * /public/images/). Si cette URL renvoie une erreur (404 si la photo
 * n'a pas encore été déposée par le client), bascule sur `fallbackSrc`
 * (typiquement une URL Unsplash thématique stable).
 *
 * Permet à ce code de référencer les paths FINAUX dès aujourd'hui :
 * dès que le client dépose ses vraies photos aux chemins attendus,
 * le fallback est ignoré sans aucun changement de code.
 */
export function SmartImage({ src, fallbackSrc, ...rest }: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  return (
    <Image
      src={currentSrc}
      onError={() => {
        if (!errored && fallbackSrc) {
          setErrored(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
      {...rest}
    />
  );
}
