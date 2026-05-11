import { TIMELINE } from "@/lib/data/timeline";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { getFallback } from "@/lib/data/imageFallbacks";
import { HistoireTimelineEvent } from "./parts/Histoire/HistoireTimelineEvent";

/**
 * Histoire — Server Component (no "use client").
 *
 * Refonte (taste-skill + soft-skill) :
 *  - En-tête asymétrique split (eyebrow + H2 gauche, intro droite)
 *  - Timeline avec rail vertical à gauche, événements en cards textuelles
 *  - Année en typographie display extralight
 *  - Tabular-nums sur les années
 *  - Hiérarchie : événement pivot 2015 et 2021 en TAILLE LARGER
 *
 * Architecture client/serveur :
 *  - Markup, fonds, rail vertical : rendus côté serveur (HTML pur).
 *  - <Reveal> hydrate juste un wrapper motion pour la révélation au scroll
 *    (eyebrow/titre + paragraphe d'intro).
 *  - Chaque événement timeline est un sub-client <HistoireTimelineEvent />
 *    pour conserver l'animation index-based + le filet décoratif scaleX.
 */
export function HistoireSection() {
  // Indice des événements pivots (qui méritent un poids visuel supplémentaire)
  const PIVOT_INDICES = new Set([0, 2]); // 2015 fondation, 2021 Maison Bledi

  return (
    <section
      id="histoire"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* Header en split asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
          <Reveal y={24} duration={0.9} noBlur className="lg:col-span-7">
            <EyebrowBadge variant="loire" className="mb-5">
              Le voyage commence en 2015
            </EyebrowBadge>
            <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
              Une{" "}
              <em className="italic font-extralight text-atlas-clay">
                histoire
              </em>{" "}
              de partage
            </h2>
          </Reveal>

          <Reveal
            as="p"
            y={20}
            duration={1}
            delay={0.2}
            className="lg:col-span-5 lg:pt-10 text-base md:text-lg text-bridge-ink/70 max-w-[55ch] leading-[1.6] font-light"
          >
            Tout commence à Orléans, au bord de la Loire, par un geste simple :
            offrir à des enfants l'accès à l'école. Dix ans plus tard, ce geste
            est devenu un pont entre la France, le Sri Lanka et le Maroc.
          </Reveal>
        </div>

        {/* Bandeau photo emblématique — Opération Cartable Sri Lanka */}
        <Reveal
          y={40}
          duration={1}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] overflow-hidden mb-16 md:mb-24 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)]"
        >
          <SmartImage
            src="/images/sri-lanka/groupe-classe.jpg"
            fallbackSrc={getFallback("/images/sri-lanka/groupe-classe.jpg") ?? ""}
            alt="Groupe d'enfants sri-lankais en uniforme et bénévoles — bras levés en V de victoire devant l'école, après la remise des cartables"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            quality={78}
            className="object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.65) 100%)",
            }}
          />
          <div className="absolute bottom-5 left-5 md:bottom-10 md:left-12 max-w-lg text-loire-pale">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] font-sans font-medium opacity-85">
              Sri Lanka · Opération Cartable
            </p>
            <p
              className="font-serif italic text-xl md:text-3xl lg:text-4xl mt-2 leading-tight"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              «&nbsp;Tout commence par un cartable.&nbsp;»
            </p>
            <p className="mt-3 text-[0.7rem] md:text-sm font-sans text-loire-pale/75 leading-relaxed max-w-md">
              Depuis 2015, chaque rentrée scolaire, 30 enfants reçoivent leurs
              fournitures, leur transport et leur dignité.
            </p>
          </div>
        </Reveal>

        {/* Galerie secondaire Sri Lanka — 3 vignettes de moments */}
        <Reveal
          delay={0.2}
          y={40}
          duration={1}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-16 md:mb-24"
        >
          {[
            {
              src: "/images/sri-lanka/groupe-cartables.jpg",
              alt: "Remise des cartables aux enfants",
              caption: "La remise",
            },
            {
              src: "/images/sri-lanka/enfant-merci.jpg",
              alt: "Échange thumbs-up entre une élève et un bénévole",
              caption: "Le merci",
            },
            {
              src: "/images/sri-lanka/medaille-merci.jpg",
              alt: "Femme et bénévole brandissant une médaille de remerciement",
              caption: "La médaille",
            },
          ].map((photo) => (
            <figure
              key={photo.src}
              className="relative aspect-[4/5] rounded-[1rem] overflow-hidden group"
            >
              <SmartImage
                src={photo.src}
                fallbackSrc={getFallback(photo.src) ?? ""}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={75}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  transitionTimingFunction: "var(--ease-quintet)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <figcaption className="absolute bottom-3 left-4 text-loire-pale text-[0.6rem] uppercase tracking-[0.25em] font-sans">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        {/* Timeline */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16 md:gap-y-24">
          {/* Rail vertical à gauche sur desktop */}
          <div
            className="hidden lg:block lg:col-span-3 lg:row-span-full relative"
            aria-hidden="true"
          >
            <div className="sticky top-32 h-[500px] flex items-start justify-center">
              <div
                className="w-px h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--color-loire-deep) 0%, var(--color-loire-stream) 30%, var(--color-atlas-ochre) 60%, var(--color-atlas-saffron) 100%)",
                }}
              />
            </div>
          </div>

          {/* Liste événements */}
          <ol className="lg:col-span-9 space-y-16 md:space-y-24">
            {TIMELINE.map((event, i) => (
              <HistoireTimelineEvent
                key={event.year}
                event={event}
                index={i}
                isPivot={PIVOT_INDICES.has(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
