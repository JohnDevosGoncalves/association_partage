import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { AstronomieThemedShell } from "./parts/Astronomie/AstronomieThemedShell";
import { AstronomieHeroStats } from "./parts/Astronomie/AstronomieHeroStats";
import { AstronomieFeatureTile } from "./parts/Astronomie/AstronomieFeatureTile";
import { AstronomieToggle } from "./parts/Astronomie/AstronomieToggle";

/**
 * Astronomie — Server Component (no "use client").
 *
 * Bento 2x2 cosmique avec 1 grande tile centrale + 3 satellites.
 *
 * Patterns appliqués :
 *  - Vibe Archetype "Ethereal Glass" (deep night bg + radial gradients)
 *  - Bento avec sizes variés (1 hero + 3 compact)
 *  - Custom cubic-bezier
 *  - Tabular nums sur stats
 *  - Spring + blur reveal au scroll
 *
 * Architecture client/serveur :
 *  - <AstronomieThemedShell /> est la coque qui dépend de useTheme() (background
 *    radial + opacity SVG constellations). Wraps le contenu.
 *  - <AstronomieHeroStats />, <AstronomieFeatureTile />, <AstronomieToggle />
 *    sont des leaves clients pour leurs animations Framer Motion / onClick.
 *  - L'en-tête éditorial est wrappé dans <Reveal>.
 *  - Les data (STATS, FEATURES) restent côté serveur et sont passées en props.
 *
 * Note : useTheme() étant requis pour switcher background + opacity SVG
 * dynamiquement (les valeurs ne sont pas trivialement réductibles à du CSS
 * data-theme), on garde une coque cliente. Le ratio reste favorable :
 * tout le markup textuel et data est statique.
 */

const STATS = [
  { value: "300", suffix: "j", label: "soleil par an" },
  { value: "1", suffix: "", label: "télescope Unistellar" },
  { value: "∞", suffix: "", label: "ciels limpides" },
];

const FEATURES = [
  {
    title: "Observation citoyenne",
    text: "Les données collectées contribuent à des programmes scientifiques internationaux.",
    icon: "search",
  },
  {
    title: "Pédagogie locale",
    text: "Ateliers d'astronomie pour les enfants, en arabe et berbère.",
    icon: "book",
  },
  {
    title: "Tourisme solidaire",
    text: "Soirées d'observation ouvertes aux mécènes en visite.",
    icon: "moon",
  },
];

export function AstronomieSection() {
  return (
    <AstronomieThemedShell>
      <div className="relative max-w-[1400px] mx-auto text-loire-pale">
        {/* En-tête — left-aligned éditorial */}
        <Reveal y={24} duration={0.9} noBlur className="mb-12 md:mb-16 max-w-3xl">
          <EyebrowBadge variant="night" className="mb-5">
            Partenariat Unistellar
          </EyebrowBadge>
          <h2 className="font-serif font-light leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
            Le ciel du{" "}
            <em className="italic font-extralight text-atlas-saffron">
              Haut-Atlas
            </em>
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-lg text-loire-pale/75 max-w-[60ch] leading-[1.55] font-light">
            300 jours de soleil par an, et autant de nuits limpides. La Maison
            Bledi accueille un télescope connecté Unistellar — chaque enfant du
            village peut observer Saturne, la Lune, les amas d'étoiles.
          </p>
        </Reveal>

        {/* Bento : 1 hero card stats + 3 features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <AstronomieHeroStats stats={STATS} />

          {FEATURES.map((card, i) => (
            <AstronomieFeatureTile key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* CTA Mode Nuit — visible seulement en mode jour */}
        <AstronomieToggle />
      </div>
    </AstronomieThemedShell>
  );
}
