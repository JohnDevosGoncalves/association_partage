import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { SectionFooterCTA } from "@/components/ui/SectionFooterCTA";
import { AstronomieHeroStats } from "./parts/Astronomie/AstronomieHeroStats";
import { AstronomieFeatureTile } from "./parts/Astronomie/AstronomieFeatureTile";

/**
 * Astronomie — Server Component (no "use client").
 *
 * Bento 2x2 cosmique avec 1 grande tile centrale + 3 satellites.
 * Mode nuit retiré (demande client) — la section reste cosmique
 * grâce au background sombre fixe.
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
    <section
      id="astronomie"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #1f2d4d 0%, #1b3a5b 50%, #0d1c33 100%)",
      }}
    >
      {/* Constellations en arrière-plan — opacité statique */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.18 }}
        aria-hidden="true"
      >
        <g
          stroke="var(--color-night-star)"
          strokeWidth="0.8"
          fill="var(--color-night-star)"
          opacity="0.7"
        >
          <line x1="180" y1="120" x2="240" y2="160" strokeOpacity="0.4" />
          <line x1="240" y1="160" x2="320" y2="140" strokeOpacity="0.4" />
          <line x1="320" y1="140" x2="400" y2="180" strokeOpacity="0.4" />
          <line x1="400" y1="180" x2="450" y2="240" strokeOpacity="0.4" />
          <line x1="450" y1="240" x2="380" y2="270" strokeOpacity="0.4" />
          <line x1="380" y1="270" x2="400" y2="180" strokeOpacity="0.4" />
          {[
            [180, 120],
            [240, 160],
            [320, 140],
            [400, 180],
            [450, 240],
            [380, 270],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2"
              className="star-twinkle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
        <g
          stroke="var(--color-night-star)"
          strokeWidth="0.8"
          fill="var(--color-night-star)"
          opacity="0.7"
        >
          <line x1="1100" y1="180" x2="1170" y2="260" strokeOpacity="0.4" />
          <line x1="1170" y1="260" x2="1240" y2="180" strokeOpacity="0.4" />
          <line x1="1130" y1="350" x2="1190" y2="350" strokeOpacity="0.4" />
          <line x1="1190" y1="350" x2="1250" y2="350" strokeOpacity="0.4" />
          <line x1="1170" y1="260" x2="1170" y2="450" strokeOpacity="0.4" />
          {[
            [1100, 180],
            [1170, 260],
            [1240, 180],
            [1130, 350],
            [1190, 350],
            [1250, 350],
            [1170, 450],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2"
              className="star-twinkle"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>
      </svg>

      <div className="relative max-w-[1400px] mx-auto text-loire-pale">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <AstronomieHeroStats stats={STATS} />
          {FEATURES.map((card, i) => (
            <AstronomieFeatureTile key={card.title} card={card} index={i} />
          ))}
        </div>

        <SectionFooterCTA
          href="/maroc"
          eyebrow="Le ciel et le territoire"
          label="Découvrir la vallée du Haut-Atlas"
          variant="dark"
        />
      </div>
    </section>
  );
}
