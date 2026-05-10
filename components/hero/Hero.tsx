import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { HeroTitle } from "./parts/HeroTitle";
import { HeroCTAs } from "./parts/HeroCTAs";
import {
  HeroEyebrowAndStats,
  HeroSubtitle,
  HeroStats,
} from "./parts/HeroEyebrowAndStats";

/**
 * Hero — Typographique éditorial moderne.
 *
 * Refonte (2026-05-10) après feedback client :
 *  - Suppression du collage photo (superposition non souhaitée)
 *  - Palette migrée vers monochrome warm + accent orange du logo
 *  - Logo intégré comme anchor visuel haut-droite
 *  - Layout asymétrique : typo massive à gauche, ornement minimal à droite
 *  - Modèle visuel : Aesop / Hermès / Loro Piana (luxe éditorial)
 *
 * Architecture :
 *  - Server Component (pas de "use client")
 *  - Sub-clients leaves : HeroTitle (WordReveal), HeroCTAs, eyebrow+stats
 *  - Pas d'image, pas de parallaxe scroll, pas de framer-motion au top level
 */
export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-[100dvh] bg-bridge-cream"
      aria-label="Bienvenue chez Association Partage"
    >
      {/* Filet horizontal subtil en haut, sous la navbar — ancre éditoriale */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-loire-stone"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[100dvh]">
        {/* COLONNE TYPO — gauche (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col">
          <HeroEyebrowAndStats />
          <HeroTitle />
          <HeroSubtitle />
          <HeroStats />
          <HeroCTAs />
        </div>

        {/* COLONNE ORNEMENT — droite (lg:col-span-4) : logo + ligne verticale */}
        <aside
          className="lg:col-span-4 hidden lg:flex flex-col items-end justify-between h-full pt-2 pb-12"
          aria-hidden="true"
        >
          {/* Logo en grand format */}
          <div className="relative">
            <BrandLogo size={200} variant="mark" />
            <span
              className="absolute -bottom-3 right-0 text-[0.6rem] uppercase tracking-[0.4em] text-bridge-ink/40 font-sans whitespace-nowrap"
            >
              Reconnue d'intérêt général
            </span>
          </div>

          {/* Filet vertical décoratif + métadonnées éditoriales */}
          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-bridge-ink/45 font-sans">
              <span>47°54′N · 31°00′N</span>
              <span className="block w-px h-4 bg-loire-stone" />
              <span>2 700 km</span>
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-loire-stone via-loire-stone to-transparent" />
          </div>
        </aside>

        {/* Logo mobile — visible uniquement sur petit écran */}
        <div
          className="lg:hidden absolute top-24 right-5"
          aria-hidden="true"
        >
          <BrandLogo size={70} variant="mark" />
        </div>
      </div>

      {/* Bandeau bas : 3 ancres rapides en typographie tracking-wide */}
      <div
        className="absolute bottom-0 inset-x-0 border-t border-loire-stone bg-bridge-cream/80 backdrop-blur-sm"
        aria-hidden="true"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-bridge-ink/55 font-sans">
            Le voyage commence
          </span>
          <div className="flex items-center gap-6 text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
            <Link
              href="/histoire"
              className="hover:text-atlas-saffron transition-colors duration-500"
            >
              Histoire
            </Link>
            <span className="block w-3 h-px bg-bridge-ink/25" />
            <Link
              href="/maison-bledi"
              className="hover:text-atlas-saffron transition-colors duration-500"
            >
              Maison Bledi
            </Link>
            <span className="block w-3 h-px bg-bridge-ink/25" />
            <Link
              href="/mecenat"
              className="hover:text-atlas-saffron transition-colors duration-500"
            >
              Mécénat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
