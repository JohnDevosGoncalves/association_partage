import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { getFallback } from "@/lib/data/imageFallbacks";
import { BrandLogo } from "@/components/ui/BrandLogo";

const HERO_PHOTO = "/images/atlas/vallee-graminees.jpg";
import { HeroTitle } from "./parts/HeroTitle";
import { HeroCTAs } from "./parts/HeroCTAs";
import {
  HeroEyebrowAndStats,
  HeroSubtitle,
  HeroStats,
} from "./parts/HeroEyebrowAndStats";

/**
 * Hero — Cinématique : full-bleed paysage Haut-Atlas + texte par-dessus.
 *
 * Refonte (2026-05-11) après réception des vraies photos terrain :
 *  - Photo plein écran de la vallée du Haut-Atlas (graminées dorées,
 *    oliviers, mont Atlas en brume) en background absolu
 *  - Triple gradient overlay (top sombre → milieu transparent → bottom
 *    cream) pour préserver la lisibilité de la typo claire et fondre
 *    dans le contenu de page suivant
 *  - Texte typographique conservé : eyebrow pill, H1 serif (révélation
 *    cinétique), subtitle, stats, CTAs
 *  - Logo orange en haut à droite, sur fond photo (avec ombre)
 *  - Couleurs de texte basculées en loire-pale (clair) pour ressortir
 *    sur la photo
 *
 * Architecture :
 *  - Server Component (no "use client")
 *  - <Image> next/image priority + sizes 100vw pour LCP optimal
 *  - Sub-clients leaves : HeroTitle, HeroCTAs, eyebrow+subtitle+stats
 */
export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-[100dvh]"
      aria-label="Bienvenue chez Association Partage"
    >
      {/* Photo plein écran — vallée du Haut-Atlas (point focal contenu) */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src={HERO_PHOTO}
          fallbackSrc={getFallback(HERO_PHOTO) ?? ""}
          alt="Vallée du Haut-Atlas marocain : graminées dorées au premier plan, oliviers épars, montagnes en arrière-plan dans la brume"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        {/* Overlay multi-stops pour lisibilité texte + fondu en bas dans la cream */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.20) 30%, rgba(15,15,15,0.25) 60%, rgba(251,248,243,0.75) 88%, var(--color-bridge-cream) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Voile chaud très subtil pour réchauffer */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,123,26,0.10) 0%, transparent 50%, rgba(140,61,8,0.15) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* CONTENU TEXTUEL */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 pt-32 md:pt-36 lg:pt-40 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[100dvh]">
        {/* COLONNE TYPO — gauche (lg:col-span-8) */}
        <div
          className="lg:col-span-8 flex flex-col text-loire-pale"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          <HeroEyebrowAndStats />
          <HeroTitle />
          <HeroSubtitle />
          <HeroStats />
          <HeroCTAs />
        </div>

        {/* COLONNE LOGO — droite (lg:col-span-4) */}
        <aside
          className="lg:col-span-4 hidden lg:flex flex-col items-end justify-between h-full pt-2 pb-12"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <div
              style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.35))" }}
            >
              <BrandLogo size={180} variant="mark" />
            </div>
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-loire-pale/75 font-sans whitespace-nowrap text-center">
              Reconnue d'intérêt général
            </span>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-loire-pale/65 font-sans">
              <span>47°54′N · 31°00′N</span>
              <span className="block w-px h-4 bg-loire-pale/35" />
              <span>2 700 km</span>
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-loire-pale/45 to-transparent" />
          </div>
        </aside>

        {/* Logo mobile */}
        <div
          className="lg:hidden absolute top-24 right-5"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}
        >
          <BrandLogo size={64} variant="mark" />
        </div>
      </div>

      {/* Bandeau bas avec ancres rapides — sur le fondu cream */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 border-t border-bridge-ink/10 bg-bridge-cream/70 backdrop-blur-md"
        aria-hidden="true"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] text-bridge-ink/60 font-sans">
            Le voyage commence
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-6 text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-bridge-ink/60 font-sans">
            <Link
              href="/loire"
              className="hover:text-loire-deep transition-colors duration-500"
            >
              De la Loire
            </Link>
            <span className="block w-3 h-px bg-bridge-ink/25" />
            <Link
              href="/maroc"
              className="hover:text-atlas-clay transition-colors duration-500"
            >
              Au Haut-Atlas
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
