"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { LayerAsset } from "@/lib/data/heroAssets";

type HeroCollageProps = {
  images: LayerAsset[];
};

/**
 * Sub-client du Hero — collage photos parallaxe avec reveal staggered.
 *
 * Isolé pour décharger Hero.tsx de Framer Motion. Les 3 photos sont passées
 * en prop depuis le server component (heroAssets résolu côté server).
 */
export function HeroCollage({ images }: HeroCollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const collageY = useTransform(scrollY, [0, 800], [0, -120]);
  const collageOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  const [main, side, accent] = images;

  return (
    <motion.div
      ref={ref}
      style={{ y: collageY, opacity: collageOpacity }}
      className="relative h-[55vh] sm:h-[65vh] lg:h-[78vh] w-full"
    >
      {/* Photo principale (Pont Royal) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="absolute right-0 bottom-0 w-[70%] aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(27,58,91,0.35)] z-20"
      >
        <Image
          src={main.src}
          alt={main.alt}
          fill
          priority
          sizes="(max-width: 1024px) 70vw, 30vw"
          className="object-cover"
          quality={65}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,91,0) 0%, rgba(27,58,91,0.25) 100%)",
          }}
        />
      </motion.div>

      {/* Photo Atlas (mid) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.85, ease: [0.32, 0.72, 0, 1] }}
        className="absolute left-0 top-[8%] w-[58%] aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(139,58,42,0.35)] z-10"
      >
        <Image
          src={side.src}
          alt={side.alt}
          fill
          sizes="(max-width: 1024px) 58vw, 25vw"
          className="object-cover"
          quality={70}
        />
      </motion.div>

      {/* Photo accent (sommets enneigés) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease: [0.32, 0.72, 0, 1] }}
        className="absolute right-[8%] top-[4%] w-[38%] aspect-square rounded-[1rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(232,163,61,0.3)] z-30 ring-1 ring-bridge-cream"
      >
        <Image
          src={accent.src}
          alt={accent.alt}
          fill
          sizes="(max-width: 1024px) 38vw, 18vw"
          className="object-cover"
          quality={70}
        />
      </motion.div>

      {/* Annotation flottante */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute left-2 bottom-4 z-40 max-w-[140px]"
        aria-hidden="true"
      >
        <div className="text-[0.55rem] uppercase tracking-[0.3em] text-bridge-ink/50 font-sans mb-1">
          47.9°N · 31.0°N
        </div>
        <div className="font-serif italic text-sm text-bridge-ink/70 leading-tight">
          Deux latitudes, un pont
        </div>
      </motion.div>
    </motion.div>
  );
}
