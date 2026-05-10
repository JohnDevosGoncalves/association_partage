"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";
import { KIOSQUE_PARTNERS } from "@/lib/data/products";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

/**
 * Kiosque Solidaire — Editorial éditorial vertical avec partenaires en
 * "Z-axis cascade" (cards qui se chevauchent légèrement avec décalage).
 *
 * Patterns :
 *  - Vibe Atlas (saffron/terracotta) sur background éditorial
 *  - Anti-3-card-grid : layout asymétrique avec offset décalés
 *  - Numéros éditoriaux pour les partenaires
 *  - Custom cubic-bezier
 */

const PARTNER_IMAGES = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574775395858-3a5cd6e0a5c3?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80&auto=format&fit=crop",
];

export function KiosqueSection() {
  return (
    <section
      id="kiosque"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #c8553d 0%, #b8472a 50%, #8b3a2a 100%)",
      }}
    >
      {/* Soleil bas en filigrane */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-atlas-cream) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Editorial Split Header — typo gauche, contexte droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-7"
          >
            <EyebrowBadge variant="night" className="mb-5">
              Agadir · Gastronomie partagée
            </EyebrowBadge>
            <h2
              className="font-serif font-light text-loire-pale leading-[0.92] text-5xl md:text-7xl lg:text-[6rem] tracking-[-0.02em]"
              style={{ textShadow: "0 4px 32px rgba(0,0,0,0.3)" }}
            >
              Le{" "}
              <em className="italic font-extralight text-atlas-cream">
                Kiosque
              </em>
              <br />
              Solidaire
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-5 lg:pt-8"
          >
            <p className="text-base md:text-lg text-loire-pale/85 leading-[1.6] font-light max-w-[55ch]">
              Une vitrine où les recettes du Val de Loire rencontrent les
              produits du Souss-Massa. Trois artisans orléanais signent les
              cartes et les vinaigres servis à 2 700 km.
            </p>

            <div className="mt-7 flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.25em] text-atlas-cream/80 font-sans">
              <span>2 700 km</span>
              <span className="w-8 h-px bg-atlas-cream/40" aria-hidden="true" />
              <span>3 artisans</span>
              <span className="w-8 h-px bg-atlas-cream/40" aria-hidden="true" />
              <span>Vendredis · Samedis</span>
            </div>
          </motion.div>
        </div>

        {/* Partenaires — Z-axis cascade avec offset */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {KIOSQUE_PARTNERS.map((partner, i) => {
            // Offset visuel : la 2e carte décalée vers le bas, la 3e vers le haut
            const offsetClass =
              i === 0 ? "" : i === 1 ? "md:mt-12 lg:mt-20" : "md:mt-4 lg:mt-8";
            return (
              <motion.article
                key={partner.name}
                initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.12,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={`md:col-span-4 ${offsetClass}`}
              >
                <div className="bezel-shell bezel-atlas">
                  <div className="bezel-core overflow-hidden">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={PARTNER_IMAGES[i]}
                        alt={`${partner.name} · ${partner.craft}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700"
                        style={{
                          transitionTimingFunction: "var(--ease-quintet)",
                        }}
                        quality={75}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(139,58,42,0.5) 100%)",
                        }}
                      />
                      {/* Index */}
                      <div
                        className="absolute top-4 left-5 font-serif font-extralight text-loire-pale text-5xl md:text-6xl leading-none tabular pointer-events-none"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="p-6 md:p-7">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium">
                        {partner.city}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl text-bridge-ink mt-2 leading-tight">
                        {partner.name}
                      </h3>
                      <p className="text-xs italic text-atlas-clay font-sans mt-1.5">
                        {partner.craft}
                      </p>

                      <div className="mt-5 pt-5 border-t border-atlas-ochre/20">
                        <p className="text-sm text-bridge-ink/70 leading-[1.6] font-light">
                          {partner.contribution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
