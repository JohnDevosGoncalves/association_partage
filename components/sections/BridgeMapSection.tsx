import dynamic from "next/dynamic";
import { Reveal } from "@/components/interactive/Reveal";

// Lazy-load — la carte SVG (~552 lignes + particules + framer-motion) ne
// pèse plus dans le first-paint. Skeleton au chargement.
const BridgeMap = dynamic(
  () => import("@/components/ui/BridgeMap").then((mod) => mod.BridgeMap),
  {
    loading: () => (
      <div
        className="w-full aspect-[12/7] rounded-2xl bg-loire-pale/5 ring-1 ring-loire-pale/10"
        aria-hidden="true"
      />
    ),
  },
);

/**
 * Section "Le pont solidaire" — bascule en mode "carte céleste cosmique"
 * pour offrir un moment de rupture visuelle dans la page (cinéma).
 *
 * Server Component : seul <BridgeMap> est un leaf client (SVG animé +
 * particules + state au survol). L'eyebrow + titre + intro sont du JSX
 * statique wrappé dans <Reveal> pour l'animation d'entrée.
 */
export function BridgeMapSection() {
  return (
    <section
      id="pont"
      className="relative py-20 md:py-32 px-5 md:px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0a1628 0%, #050a1a 60%, #020510 100%)",
      }}
    >
      {/* Lueurs latérales subtiles */}
      <div
        className="absolute top-1/2 left-0 w-1/3 h-[80%] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(122, 156, 184, 0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-0 w-1/3 h-[80%] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right, rgba(232, 163, 61, 0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center mb-10 md:mb-16 text-loire-pale">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-cream font-sans font-medium">
            2 700 km · Un pont solidaire
          </p>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 md:mt-4 leading-tight">
            D'<em className="italic text-loire-mist">Orléans</em>{" "}
            <span className="text-loire-pale/40">au</span>{" "}
            <em className="italic text-atlas-saffron">Haut-Atlas</em>
          </h2>
          <p className="mt-5 md:mt-7 text-base md:text-lg text-loire-pale/75 max-w-2xl mx-auto leading-relaxed">
            Le voyage est constant — produits, savoirs, hospitalité circulent
            dans les deux sens. Survolez chaque ancrage pour découvrir ce qui
            s'y passe.
          </p>
        </Reveal>

        <BridgeMap />
      </div>
    </section>
  );
}
