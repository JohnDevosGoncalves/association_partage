import { TIMELINE } from "@/lib/data/timeline";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { HistoireTimelineEvent } from "./parts/Histoire/HistoireTimelineEvent";
import { SriLankaGallery } from "./parts/Histoire/SriLankaGallery";

/**
 * Histoire — Server Component.
 *
 * Galerie Sri Lanka (5 photos cliquables → lightbox) + timeline éditoriale.
 */
export function HistoireSection() {
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

        {/* Galerie Sri Lanka cliquable (5 photos avec lightbox) */}
        <SriLankaGallery />

        {/* Timeline */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16 md:gap-y-24">
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
