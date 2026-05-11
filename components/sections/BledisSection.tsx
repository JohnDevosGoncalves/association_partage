import { ImpactCounter } from "@/components/ui/ImpactCounter";
import { IMPACTS } from "@/lib/data/timeline";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { SectionFooterCTA } from "@/components/ui/SectionFooterCTA";
import {
  BledisFeatureTile,
  type BledisFeature,
} from "./parts/Bledis/BledisFeatureTile";
import { EcosystemeGallery } from "./parts/Bledis/EcosystemeGallery";

/**
 * Maison Bledi — Server Component (no "use client").
 *
 * Asymmetrical Bento (per soft-skill §3 Layout Archetype #1) :
 *  - 1 grande tile "PMR" qui domine (col-span-7 row-span-2)
 *  - 4 petites tiles satellites (col-span-3/5)
 *  - Bandeau ImpactCounter en bas pleine largeur
 *
 * Architecture client/serveur :
 *  - Le markup de la section, le fond radial, les data sont rendus serveur.
 *  - Chaque tile bento est un sub-client <BledisFeatureTile /> (animation
 *    fade-up + filet scaleX hero).
 *  - L'en-tête éditorial est wrappé dans <Reveal>.
 *  - Les ImpactCounter restent clients (intra-component RAF + useInView).
 */

const FEATURES: BledisFeature[] = [
  {
    title: "Accessibilité totale PMR",
    description:
      "Rampes à 6 % maximum, sanitaires aux normes, cuisine adaptée, terrasses sans seuil. Une famille avec fauteuil traverse l'intégralité du bâtiment sans rencontrer d'obstacle.",
    metric: "0",
    metricLabel: "marche",
    size: "hero",
    variant: "atlas",
  },
  {
    title: "Énergie solaire",
    description: "Toiture photovoltaïque + eau chaude solaire toute l'année.",
    metric: "100 %",
    metricLabel: "autonomie",
    size: "compact",
    variant: "atlas",
  },
  {
    title: "Recyclage des eaux",
    description: "Phytoépuration des eaux grises pour l'arrosage du jardin.",
    metric: "0 L",
    metricLabel: "perdus",
    size: "compact",
    variant: "loire",
  },
  {
    title: "Bungalows de répit",
    description:
      "Espaces dédiés aux bénéficiaires de notre ONG partenaire pour des séjours de récupération.",
    metric: "2",
    metricLabel: "bungalows",
    size: "wide",
    variant: "atlas",
  },
  {
    title: "Compost intégré",
    description: "Cycle court : restes cuisine vers jardin. Zéro déchet.",
    size: "compact",
    variant: "atlas",
  },
  {
    title: "130 m² sur 3 niveaux",
    description: "Bâti pensé pour la vie en commun.",
    metric: "3",
    metricLabel: "niveaux",
    size: "compact",
    variant: "loire",
  },
];

export function BledisSection() {
  return (
    <section
      id="bledi"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center top, #f4e4c1 0%, #f8f4ed 50%, #f1ecdf 100%)",
      }}
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* En-tête éditorial — left-aligned (anti-center bias) */}
        <Reveal y={24} duration={0.9} noBlur className="mb-12 md:mb-16 max-w-3xl">
          <EyebrowBadge variant="atlas" className="mb-5">
            Au cœur du Haut-Atlas
          </EyebrowBadge>
          <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
            La Maison{" "}
            <em className="italic font-extralight text-atlas-clay">Bledi</em>
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-lg text-bridge-ink/70 max-w-[60ch] leading-[1.55] font-light">
            Notre centre permanent au Haut-Atlas — un lieu d'accueil pensé dès
            la première pierre pour être totalement accessible et autosuffisant
            en énergie.
          </p>
        </Reveal>

        {/* Bento grid asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-rows-[auto_auto] gap-4 md:gap-5">
          {FEATURES.map((feature, i) => (
            <BledisFeatureTile
              key={feature.title}
              feature={feature}
              index={i}
            />
          ))}
        </div>

        {/* Bandeau impacts chiffrés — full width séparé */}
        <Reveal
          y={0}
          duration={1}
          delay={0.4}
          noBlur
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 md:py-12 border-t border-atlas-ochre/25 border-b"
        >
          {IMPACTS.map((impact) => (
            <ImpactCounter
              key={impact.label}
              value={impact.value}
              suffix={impact.suffix}
              label={impact.label}
            />
          ))}
        </Reveal>

        {/* Galerie écosystème — l'environnement autour du centre */}
        <div className="mt-20 md:mt-28">
          <Reveal y={24} duration={0.9} noBlur className="mb-10 md:mb-14 max-w-2xl">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium mb-3">
              L'écosystème
            </p>
            <h3 className="font-serif font-light text-bridge-ink leading-[1] text-3xl md:text-5xl tracking-[-0.01em]">
              Tout autour, le{" "}
              <em className="italic font-extralight text-atlas-clay">
                Haut-Atlas
              </em>
            </h3>
            <p className="mt-4 md:mt-5 text-sm md:text-base text-bridge-ink/65 max-w-[55ch] leading-[1.6] font-light">
              Le centre Bledi n'est pas une enclave. Il est posé dans une
              vallée, en bord d'oued, à portée d'un village millénaire, sous
              le regard d'une faune endémique. Le lieu vit avec son écosystème.
            </p>
          </Reveal>

          <EcosystemeGallery />
        </div>

        <SectionFooterCTA
          href="/maison-bledi"
          eyebrow="Visite détaillée"
          label="Explorer la Maison Bledi"
          variant="atlas"
        />
      </div>
    </section>
  );
}
