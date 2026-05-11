import Image from "next/image";
import clsx from "clsx";

type BrandLogoProps = {
  /** Taille en px (carré) */
  size?: number;
  /** Affiche le mark seul (juste le P) ou avec le wordmark */
  variant?: "mark" | "full";
  /** Inversé pour fonds sombres */
  inverted?: boolean;
  className?: string;
};

/**
 * Logo Association Partage.
 *
 * Photo source : /images/brand/logo.jpg (P stylisé orange + silhouette
 * d'enfant en négatif + signature "Association Partage" en script).
 *
 * Pour fournir une version inversée (fond sombre), créer
 * /images/brand/logo-white.png et adapter la logique ci-dessous.
 */
export function BrandLogo({
  size = 64,
  variant = "mark",
  inverted = false,
  className,
}: BrandLogoProps) {
  // Le fichier est le même pour mark et full pour l'instant
  // (le logo officiel inclut déjà le wordmark "Association Partage")
  const src = "/images/brand/logo.jpg";

  return (
    <Image
      src={src}
      alt="Association Partage"
      width={size}
      height={size}
      priority
      className={clsx(
        "object-contain",
        inverted && "invert brightness-0",
        className,
      )}
    />
  );
}
