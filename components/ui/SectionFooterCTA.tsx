import Link from "next/link";
import clsx from "clsx";

type SectionFooterCTAProps = {
  /** URL cible de la page dédiée */
  href: string;
  /** Eyebrow court — typiquement "Aller plus loin", "Voir tous", etc. */
  eyebrow: string;
  /** Libellé éditorial du lien — court, sans → final (ajouté auto) */
  label: string;
  /** Variante visuelle selon le fond de la section */
  variant?: "light" | "dark" | "atlas" | "loire";
  /** Classes additionnelles pour le wrapper */
  className?: string;
};

const VARIANTS = {
  light: {
    eyebrow: "text-atlas-clay",
    label: "text-bridge-ink hover:text-atlas-saffron",
    rule: "bg-bridge-ink/15",
  },
  dark: {
    eyebrow: "text-atlas-saffron",
    label: "text-loire-pale hover:text-atlas-saffron",
    rule: "bg-loire-pale/20",
  },
  atlas: {
    eyebrow: "text-atlas-clay",
    label: "text-bridge-ink hover:text-atlas-clay",
    rule: "bg-atlas-clay/25",
  },
  loire: {
    eyebrow: "text-loire-deep",
    label: "text-bridge-ink hover:text-loire-deep",
    rule: "bg-loire-deep/20",
  },
} as const;

/**
 * CTA éditorial en fin de section home — invite à creuser le sujet
 * dans la page dédiée.
 *
 * Volontairement minimaliste, sans bouton tape-à-l'œil :
 *  - Eyebrow court en uppercase tracked
 *  - Lien italique serif avec flèche animée au hover
 *  - Filet horizontal en dessous pour ancrer visuellement
 *
 * Le typage variant permet de l'adapter aux 4 fonds de section
 * (cream clair, bridge-ink sombre, atlas chaleureux, loire frais).
 */
export function SectionFooterCTA({
  href,
  eyebrow,
  label,
  variant = "light",
  className,
}: SectionFooterCTAProps) {
  const v = VARIANTS[variant];

  return (
    <div className={clsx("mt-16 md:mt-20", className)}>
      <div className={clsx("h-px w-full mb-6 md:mb-8", v.rule)} />
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
        <p
          className={clsx(
            "text-[0.6rem] md:text-xs uppercase tracking-[0.35em] font-sans font-medium",
            v.eyebrow,
          )}
        >
          {eyebrow}
        </p>
        <Link
          href={href}
          className={clsx(
            "group inline-flex items-baseline gap-3 font-serif italic text-xl md:text-2xl lg:text-3xl transition-colors duration-500",
            v.label,
          )}
        >
          {label}
          <span
            aria-hidden="true"
            className="not-italic font-sans text-base md:text-lg transition-transform duration-500 group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
