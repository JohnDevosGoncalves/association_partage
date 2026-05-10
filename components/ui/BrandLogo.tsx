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
 * Comportement :
 *  - Tente d'abord /images/brand/logo.png (votre PNG quand vous le déposerez)
 *  - Fallback sur /images/brand/logo-placeholder.svg en attendant
 *
 * Pour échanger : déposez votre PNG dans public/images/brand/logo.png
 * et changez la prop `src` ci-dessous (ou supprimez le fallback).
 */
export function BrandLogo({
  size = 64,
  variant = "mark",
  inverted = false,
  className,
}: BrandLogoProps) {
  const src =
    variant === "full"
      ? "/images/brand/logo-placeholder.svg"
      : "/images/brand/logo-placeholder.svg";

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
