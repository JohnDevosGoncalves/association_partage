import { KIOSQUE_PARTNERS, type Partner } from "@/lib/data/products";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { KiosqueSpread } from "./parts/Kiosque/KiosqueSpread";

/**
 * Kiosque Solidaire — Editorial spread + galerie multi-photos + lightbox.
 *
 * Pour chaque partenaire, on affiche :
 *  - Une image hero (3:4)
 *  - Le texte éditorial (bio, contribution)
 *  - Une grille de vignettes additionnelles (toutes les photos restantes)
 *  - Clic sur n'importe quelle photo → ouvre la lightbox
 */
export function KiosqueSection() {
  return (
    <section
      id="kiosque"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)",
      }}
    >
      <div
        className="absolute top-[30%] right-[10%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-atlas-saffron) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* En-tête split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 md:mb-28">
          <Reveal className="lg:col-span-7">
            <EyebrowBadge variant="night" className="mb-5">
              Agadir · Gastronomie partagée
            </EyebrowBadge>
            <h2
              className="font-serif font-light text-loire-pale leading-[0.92] text-5xl md:text-7xl lg:text-[6rem] tracking-[-0.02em]"
              style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
            >
              Le{" "}
              <em className="italic font-extralight text-atlas-saffron">
                Kiosque
              </em>
              <br />
              Solidaire
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pt-8">
            <p className="text-base md:text-lg text-loire-pale/80 leading-[1.6] font-light max-w-[55ch]">
              Quatre maîtres artisans d'Orléans embarquent leur savoir-faire à
              Agadir. Un dialogue entre Val de Loire et Souss-Massa, autour
              d'une table et d'un verre.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.65rem] uppercase tracking-[0.25em] text-atlas-cream/80 font-sans">
              <span>2 700 km</span>
              <span className="w-8 h-px bg-atlas-cream/30" aria-hidden="true" />
              <span>4 artisans</span>
              <span className="w-8 h-px bg-atlas-cream/30" aria-hidden="true" />
              <span>Vendredis · Samedis</span>
            </div>
          </Reveal>
        </div>

        {/* Spreads — chaque partenaire avec sa galerie cliquable */}
        <div className="space-y-28 md:space-y-36 lg:space-y-44">
          {KIOSQUE_PARTNERS.map((partner: Partner, i: number) => (
            <KiosqueSpread
              key={partner.slug}
              partner={partner}
              index={i}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
