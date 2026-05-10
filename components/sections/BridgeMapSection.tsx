"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { BridgeMap } from "@/components/ui/BridgeMap";

/**
 * Section "Le pont solidaire" — bascule en mode "carte céleste cosmique"
 * pour offrir un moment de rupture visuelle dans la page (cinéma).
 *
 * Refonte 2026-05-10 : fond profond + glow accents qui complètent la
 * nouvelle BridgeMap blueprint.
 */
export function BridgeMapSection() {
  return (
    <section
      id="pont"
      className="relative py-20 md:py-32 px-5 md:px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0a1628 0%, #050a1a 60%, #020510 100%)",
      }}
    >
      {/* Lueurs latérales subtiles */}
      <div
        className="absolute top-1/2 left-0 w-1/3 h-[80%] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(122, 156, 184, 0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-0 w-1/3 h-[80%] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right, rgba(232, 163, 61, 0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-10 md:mb-16 text-loire-pale"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-cream font-sans font-medium">
            2 700 km · Un pont solidaire
          </p>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 md:mt-4 leading-tight">
            D'<em className="italic text-loire-mist">Orléans</em>{" "}
            <span className="text-loire-pale/40">au</span>{" "}
            <em className="italic text-atlas-saffron">Haut-Atlas</em>
          </h2>
          <p className="mt-5 md:mt-7 text-base md:text-lg text-loire-pale/75 max-w-2xl mx-auto leading-relaxed">
            Le voyage est constant — produits, savoirs, hospitalité circulent
            dans les deux sens. Survolez chaque ancrage pour découvrir ce qui
            s'y passe.
          </p>
        </motion.div>

        <BridgeMap />
      </div>
    </section>
  );
}
