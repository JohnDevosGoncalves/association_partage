"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { LayerAsset } from "@/lib/data/heroAssets";

type ParallaxLayerProps = {
  asset: LayerAsset;
  /** Plage verticale (en px) sur laquelle le layer se déplace */
  range?: number;
  /** Direction du parallaxe — "up" = monte avec le scroll, "down" = descend */
  direction?: "up" | "down";
  /** Z-index pour la composition */
  zIndex?: number;
  /** Classe CSS supplémentaire pour positionner/cropper le layer */
  className?: string;
  /** Charger l'image en priorité (above-the-fold) */
  priority?: boolean;
  /** Valeur de scroll pré-calculée (optionnel, pour synchro entre plusieurs scènes) */
  scrollY?: MotionValue<number>;
};

/**
 * Une couche photographique qui se déplace verticalement au rythme du scroll.
 *
 * Plus la `depth` de l'asset est faible (= arrière-plan), moins le layer bouge.
 * Plus elle est haute (= premier plan), plus le déplacement est marqué.
 * Combiné, cela donne l'illusion de profondeur (parallaxe physique).
 *
 * Image servie via next/image → format AVIF/WebP, lazy-loading par défaut,
 * dimensions responsive optimisées.
 */
export function ParallaxLayer({
  asset,
  range = 200,
  direction = "up",
  zIndex = 1,
  className = "",
  priority = false,
  scrollY,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY: localScrollY } = useScroll();
  const scrollSource = scrollY ?? localScrollY;

  // Plus le layer est profond, plus il se déplace (effet parallaxe inversé:
  // avant-plan rapide, arrière-plan lent).
  const moveDistance = range * asset.depth;
  const sign = direction === "up" ? -1 : 1;

  // Déplacement vertical — démarre à 0, atteint moveDistance après ~window.innerHeight de scroll
  const y = useTransform(
    scrollSource,
    [0, 1000],
    [0, sign * moveDistance],
    { clamp: false },
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, zIndex, backgroundColor: asset.fallbackColor }}
      className={`absolute inset-0 will-change-transform ${className}`}
      aria-hidden="true"
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        quality={80}
      />
    </motion.div>
  );
}
