import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { Reveal } from "@/components/interactive/Reveal";
import { PmrBlueprint } from "./parts/Accessibilite/PmrBlueprint";

const PROMESSES = [
  {
    metric: "100 %",
    label: "des espaces accessibles",
    text: "Zéro pièce inaccessible en fauteuil — c'est notre engagement non négociable.",
  },
  {
    metric: "0",
    label: "marche / seuil",
    text: "Plain-pied intégral. Aucun ressaut entre l'extérieur et l'intérieur, ni entre les pièces.",
  },
  {
    metric: "4",
    label: "chambres adaptées",
    text: "Lit médicalisable, salle de bain en suite, bouton d'appel, transfert latéral.",
  },
  {
    metric: "1,40 m",
    label: "largeur des couloirs",
    text: "Un fauteuil électrique manœuvre sans contrainte. Cinq personnes peuvent se croiser.",
  },
];

/**
 * Section "L'accueil PMR" — argument différenciateur central pour le mécénat.
 *
 * Structure :
 *  1. En-tête éditorial avec promesse forte
 *  2. Plan interactif (PmrBlueprint) avec 6 pins cliquables
 *  3. Bandeau 4 chiffres-clés
 *  4. Citation manifeste
 *  5. CTA mécénat orienté "soutenez l'accessibilité"
 */
export function AccessibiliteSection() {
  return (
    <section
      id="accueil-pmr"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden bg-bridge-cream"
    >
      {/* Décor : ondulations ocre subtiles */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-atlas-saffron) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header split asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-20">
          <Reveal y={24} duration={0.9} noBlur className="lg:col-span-7">
            <EyebrowBadge variant="atlas" className="mb-5">
              Accessibilité totale · Norme PMR
            </EyebrowBadge>
            <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
              Une maison{" "}
              <em className="italic font-extralight text-atlas-clay">
                pour tous
              </em>
              , sans exception
            </h2>
          </Reveal>

          <Reveal
            as="p"
            y={20}
            duration={1}
            delay={0.2}
            className="lg:col-span-5 lg:pt-10 text-base md:text-lg text-bridge-ink/75 max-w-[55ch] leading-[1.6] font-light"
          >
            La Maison Bledi est l'un des rares centres d'accueil du Haut-Atlas
            entièrement pensé pour les personnes à mobilité réduite. Pas
            d'inclusion symbolique : un bâti, des normes, et la dignité du
            quotidien.
          </Reveal>
        </div>

        {/* Plan interactif avec pins cliquables */}
        <Reveal y={40} duration={1} className="mb-16 md:mb-24">
          <PmrBlueprint />
        </Reveal>

        {/* Bandeau 4 promesses chiffrées */}
        <Reveal
          y={30}
          duration={0.9}
          delay={0.1}
          noBlur
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 py-10 md:py-12 border-t border-b border-atlas-ochre/25"
        >
          {PROMESSES.map((p) => (
            <div key={p.label} className="text-center">
              <div
                className="font-serif text-4xl md:text-6xl font-extralight text-atlas-clay leading-none tabular"
              >
                {p.metric}
              </div>
              <div className="mt-2 text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
                {p.label}
              </div>
              <p className="mt-3 text-xs md:text-sm text-bridge-ink/70 leading-relaxed font-light max-w-[24ch] mx-auto">
                {p.text}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Citation manifeste */}
        <Reveal
          y={24}
          duration={1}
          delay={0.2}
          noBlur
          className="mt-16 md:mt-20 max-w-3xl"
        >
          <p className="text-[0.55rem] uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium mb-5">
            Notre engagement
          </p>
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-bridge-ink leading-[1.25] font-light">
            «&nbsp;Trop d'établissements promettent l'inclusion et oublient la
            marche d'entrée. Chez Bledi, l'accessibilité n'est pas un{" "}
            <em className="not-italic font-normal text-atlas-clay">
              supplément
            </em>{" "}
            — c'est la condition de la mission.&nbsp;»
          </blockquote>
          <div className="mt-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
            <span className="w-8 h-px bg-atlas-clay/40" />
            <span>Charte fondatrice de la Maison Bledi</span>
          </div>
        </Reveal>

        {/* CTA mécénat orienté accessibilité */}
        <Reveal
          y={20}
          duration={0.7}
          delay={0.3}
          noBlur
          className="mt-14 md:mt-20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-atlas-clay/5 ring-1 ring-atlas-clay/20">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium mb-2">
                Mécénat dédié
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-bridge-ink leading-tight">
                Soutenir l'accessibilité PMR
              </h3>
              <p className="mt-2 text-sm text-bridge-ink/65 max-w-md">
                Niveau Or : acquisition d'un Quadrix tout-terrain. Niveau
                Platinium : véhicule TPMR complet pour les déplacements.
              </p>
            </div>
            <a
              href="/mecenat"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-atlas-clay hover:bg-atlas-terracotta text-loire-pale font-sans font-medium tracking-wide text-sm transition-all duration-500 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Devenir mécène
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
