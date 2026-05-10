"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";
import { COOPERATIVE_PRODUCTS } from "@/lib/data/products";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

/**
 * Coopérative — Zig-zag 2-col éditorial.
 *
 * Layout : alternance texte/image gauche-droite à chaque produit (4 produits =
 * 4 rangées zig-zag). Anti-3-column-card-grid (banni par soft-skill §2).
 *
 * Patterns :
 *  - Editorial split par rangée
 *  - Index numérique éditorial (01., 02., 03., 04.) — pattern magazine
 *  - Photos picsum seedées (relevant + stable)
 *  - Custom cubic-bezier sur reveal
 */

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603189863860-b53fea3a4cd3?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608664735797-3aab64a87aa3?w=1200&q=80&auto=format&fit=crop",
];

export function CooperativeSection() {
  return (
    <section
      id="cooperative"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* En-tête éditorial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <EyebrowBadge variant="atlas" className="mb-5">
            Coopérative · Production locale
          </EyebrowBadge>
          <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
            Quatre{" "}
            <em className="italic font-extralight text-atlas-clay">savoirs</em>
            ,
            <br />
            une économie locale
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-lg text-bridge-ink/70 max-w-[60ch] leading-[1.55] font-light">
            Savonnerie artisanale et huiles vierges produites par les femmes du
            village. Chaque achat finance directement leur autonomie économique.
          </p>
        </motion.div>

        {/* Zig-zag rows */}
        <div className="space-y-20 md:space-y-32 lg:space-y-40">
          {COOPERATIVE_PRODUCTS.map((product, i) => {
            const isReverse = i % 2 === 1;
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-7 ${isReverse ? "lg:[direction:ltr]" : ""}`}
                >
                  <div className="relative bezel-shell bezel-atlas">
                    <div className="bezel-core relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={PRODUCT_IMAGES[i]}
                        alt={`${product.name} — production ${product.origin}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                        quality={80}
                      />
                      {/* Index numérique flottant */}
                      <div
                        className="absolute top-5 left-6 font-serif font-extralight text-loire-pale text-[5rem] md:text-[7rem] leading-none tabular pointer-events-none"
                        style={{
                          textShadow: "0 4px 24px rgba(0,0,0,0.4)",
                        }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Texte */}
                <div
                  className={`lg:col-span-5 ${isReverse ? "lg:[direction:ltr]" : ""}`}
                >
                  <div className="text-[0.65rem] uppercase tracking-[0.3em] text-atlas-ochre font-sans font-medium mb-3">
                    {product.origin}
                  </div>
                  <h3
                    className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-bridge-ink leading-[1.05] tracking-[-0.01em]"
                    style={{ textWrap: "balance" }}
                  >
                    {product.name}
                  </h3>

                  {/* Filet décoratif */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.4,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="my-6 md:my-7 h-px w-16 bg-atlas-clay origin-left"
                  />

                  <p
                    className="text-base md:text-lg text-bridge-ink/70 leading-[1.6] font-light max-w-[50ch]"
                    style={{ textWrap: "pretty" }}
                  >
                    {product.description}
                  </p>

                  {/* Tag catégorie */}
                  <div className="mt-7">
                    <span
                      className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-bridge-ink/50 font-sans"
                    >
                      <span
                        className="w-6 h-px bg-atlas-clay/40"
                        aria-hidden="true"
                      />
                      {product.category === "savon" ? "Savon SAF" : "Huile vierge"}
                    </span>
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
