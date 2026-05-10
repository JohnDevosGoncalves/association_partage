import dynamic from "next/dynamic";
import { Reveal } from "@/components/interactive/Reveal";

// Lazy-load — la table 4 niveaux (~156 lignes interactives) et la carte
// parrainage (~51 lignes motion) ne pèsent pas dans le first-paint.
const MecenatTable = dynamic(
  () =>
    import("@/components/ui/MecenatTable").then((mod) => mod.MecenatTable),
  {
    loading: () => (
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-2 pt-5 md:pt-7"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[420px] rounded-2xl bg-loire-stone/40 animate-pulse"
          />
        ))}
      </div>
    ),
  },
);
const ColombelCard = dynamic(
  () =>
    import("@/components/parrains/ColombelCard").then(
      (mod) => mod.ColombelCard,
    ),
);

/**
 * Section "Devenir mécène" — Server Component.
 *
 * Le wrapper de section, l'eyebrow, le titre et le CTA terminal sont du JSX
 * statique. Seuls <MecenatTable> et <ColombelCard> (déjà clients) sont des
 * leaves hydratés. Les animations d'entrée passent par <Reveal>.
 */
export function MecenatSection() {
  return (
    <section
      id="mecenat"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-clay font-sans font-medium">
            Engagez-vous à nos côtés
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            Devenir <em className="italic text-atlas-clay">mécène</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
            Quatre niveaux d'engagement, quatre impacts concrets. Survolez un
            niveau pour découvrir ce que votre soutien rend possible.
          </p>
        </Reveal>

        <MecenatTable />

        <div className="mt-16 md:mt-24">
          <ColombelCard />
        </div>

        <Reveal y={20} duration={0.7} noBlur className="mt-14 md:mt-20 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-bridge-ink hover:bg-atlas-clay text-bridge-cream font-sans font-medium tracking-wide rounded-full transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Construisons ensemble
            <span className="ml-3">→</span>
          </a>
          <p className="mt-4 text-sm text-bridge-ink/60 italic">
            Toutes nos conventions de mécénat ouvrent droit à 60 % de réduction d'impôt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
