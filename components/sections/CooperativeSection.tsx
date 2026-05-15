import Image from "next/image";
import { COOPERATIVE_PRODUCTS } from "@/lib/data/products";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { SectionFooterCTA } from "@/components/ui/SectionFooterCTA";
import { CooperativeFilet } from "./parts/Cooperative/CooperativeFilet";

/**
 * Coopérative — Server Component (no "use client").
 *
 * Zig-zag 2-col éditorial : alternance texte/image gauche-droite à chaque
 * produit (4 produits = 4 rangées zig-zag). Anti-3-column-card-grid.
 *
 * Architecture client/serveur :
 *  - Wrapper de section, fond, en-tête, markup des rangées : serveur (HTML pur).
 *  - <Reveal> (fade-up + blur) pour l'en-tête et chaque article zig-zag.
 *  - <CooperativeFilet> sub-client pour le filet décoratif scaleX.
 */

// Photos Coopérative — vraies photos terrain reçues (mai 2026)
// Chaque produit a désormais sa photo dédiée, posée sur les rochers du
// Haut-Atlas avec vallée en arrière-plan.
const PRODUCT_IMAGES = [
  "/images/blog/savon-lait-chevre.jpg", // Savon au lait de chèvre
  "/images/blog/miel.jpg",              // Savon au miel d'altitude
  "/images/blog/huile-olive.jpg",       // Huile d'olive vierge extra
  "/images/blog/huile-argan.jpg",       // Huile d'argan alimentaire
];

export function CooperativeSection() {
  return (
    <section
      id="cooperative"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* En-tête éditorial */}
        <Reveal className="mb-16 md:mb-24 max-w-3xl">
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
        </Reveal>

        {/* Zig-zag rows */}
        <div className="space-y-20 md:space-y-32 lg:space-y-40">
          {COOPERATIVE_PRODUCTS.map((product, i) => {
            const isReverse = i % 2 === 1;
            return (
              <Reveal
                key={product.name}
                as="article"
                delay={i * 0.1}
                y={50}
                duration={1}
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
                        quality={65}
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
                  <CooperativeFilet />

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
              </Reveal>
            );
          })}
        </div>

        <SectionFooterCTA
          href="/cooperative"
          eyebrow="Atelier et recettes"
          label="Découvrir la Coopérative"
          variant="atlas"
        />
      </div>
    </section>
  );
}
