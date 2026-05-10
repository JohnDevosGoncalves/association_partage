"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { BridgeMap } from "@/components/ui/BridgeMap";

export function BridgeMapSection() {
  return (
    <section
      id="pont"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden"
      style={{ background: "var(--color-bridge-cream)" }}
    >
      {/* Filigrane : grille de coordonnées style carte ancienne */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--color-loire-deep)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-ochre font-sans font-medium">
            2 700 km · Un pont solidaire
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            D'<em className="italic text-loire-deep">Orléans</em> au{" "}
            <em className="italic text-atlas-clay">Haut-Atlas</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
            Le voyage est constant — produits, savoirs, hospitalité circulent
            dans les deux sens. Cliquez sur chaque ancrage pour découvrir
            ce qui s'y passe.
          </p>
        </motion.div>

        <BridgeMap />
      </div>
    </section>
  );
}
