"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import {
  getPartnerLogoSrc,
  getPartnerInitials,
  WHITE_PARTNER_LOGOS,
} from "@/lib/data/partners-extended";

type PartnerLogoProps = {
  slug: string;
  name: string;
  /** Taille du carré conteneur en px. */
  size?: number;
  className?: string;
};

/**
 * Affiche le logo d'un partenaire dans un cadre carré (object-contain).
 * Fallback : initiales sur fond crème si pas de fichier ou si le chargement échoue.
 */
export function PartnerLogo({
  slug,
  name,
  size = 64,
  className,
}: PartnerLogoProps) {
  const src = getPartnerLogoSrc(slug);
  const [errored, setErrored] = useState(false);

  const showFallback = !src || errored;

  return (
    <div
      className={clsx(
        "shrink-0 rounded-xl bg-bridge-cream border border-loire-stone/40 overflow-hidden flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {showFallback ? (
        <span className="font-serif text-bridge-ink/70 text-lg font-light tracking-wide">
          {getPartnerInitials(name)}
        </span>
      ) : (
        <Image
          src={src!}
          alt=""
          width={size}
          height={size}
          className={clsx(
            "object-contain p-1.5",
            WHITE_PARTNER_LOGOS.has(slug) && "brightness-0 opacity-80",
          )}
          onError={() => setErrored(true)}
          unoptimized
        />
      )}
    </div>
  );
}
