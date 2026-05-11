import Image from "next/image";
import { KIOSQUE_PARTNERS } from "@/lib/data/products";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";

/**
 * Kiosque Solidaire — Editorial spread 4 partenaires (Server Component).
 *
 * Refonte avec photos partenaires réelles :
 *  - Layout magazine zig-zag (image gauche/droite alternée, comme un dépliant)
 *  - Chaque partenaire occupe une "spread" pleine largeur avec photo hero
 *    + texte éditorial + image détail
 *  - Couleurs d'accent issues de l'identité visuelle de chaque partenaire
 *    (Hay : bleu pâle / blanc ; Papion : noir studio ; Pouret : ardoise ;
 *     Duralex : terracotta + couleurs vibrantes)
 *  - Section background sombre cinéma pour unifier les 4 spreads
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
      {/* Halo subtil */}
      <div
        className="absolute top-[30%] right-[10%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-atlas-saffron) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Editorial Split Header */}
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

        {/* Spreads partenaires — zig-zag éditorial */}
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {KIOSQUE_PARTNERS.map((partner, i) => {
            const isReverse = i % 2 === 1;
            return (
              <Reveal
                key={partner.slug}
                as="article"
                delay={0.1}
                y={50}
                duration={1}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image principale */}
                <div
                  className={`lg:col-span-7 ${isReverse ? "lg:[direction:ltr]" : ""}`}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden ring-1 ring-loire-pale/8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                    <Image
                      src={partner.heroImage}
                      alt={`${partner.name} — ${partner.craft}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      quality={80}
                    />
                    {/* Index numérique éditorial overlay */}
                    <div
                      className="absolute top-5 left-6 lg:top-7 lg:left-8 font-serif font-extralight text-loire-pale text-[4rem] md:text-[6rem] lg:text-[7rem] leading-none tabular pointer-events-none"
                      style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Voile sombre subtil en bas pour lisibilité */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
                      }}
                    />
                  </div>
                </div>

                {/* Texte éditorial */}
                <div
                  className={`lg:col-span-5 text-loire-pale ${isReverse ? "lg:[direction:ltr]" : ""}`}
                >
                  <p
                    className="text-[0.65rem] uppercase tracking-[0.3em] font-sans font-medium mb-3"
                    style={{ color: "var(--color-atlas-saffron)" }}
                  >
                    {partner.city}
                    {partner.since && (
                      <>
                        <span className="mx-2 opacity-50">·</span>
                        {partner.since}
                      </>
                    )}
                  </p>
                  <h3
                    className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-loire-pale leading-[1.05] tracking-[-0.01em]"
                    style={{ textWrap: "balance" }}
                  >
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-base italic font-serif text-atlas-cream/80">
                    {partner.craft}
                  </p>

                  {/* Filet décoratif */}
                  <div className="my-6 md:my-8 h-px w-16 bg-atlas-saffron" />

                  <p
                    className="text-base md:text-[1.05rem] text-loire-pale/75 leading-[1.7] font-light max-w-[52ch]"
                    style={{ textWrap: "pretty" }}
                  >
                    {partner.bio}
                  </p>

                  <div className="mt-7 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-loire-pale/55 font-sans">
                    <span className="w-6 h-px bg-loire-pale/30" />
                    <span>{partner.contribution}</span>
                  </div>

                  {/* Vignette détail (miniature) */}
                  {partner.detailImage !== partner.heroImage && (
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden ring-1 ring-loire-pale/15">
                        <Image
                          src={partner.detailImage}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                          quality={70}
                        />
                      </div>
                      <p className="text-xs text-loire-pale/55 font-sans italic max-w-[160px] leading-snug">
                        Une signature à découvrir au Kiosque
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
