import clsx from "clsx";
import type { ReactNode } from "react";

type EyebrowBadgeProps = {
  children: ReactNode;
  /** Variant chromatique selon le contexte de la section */
  variant?: "loire" | "atlas" | "bridge" | "night";
  className?: string;
};

const VARIANT_STYLES: Record<NonNullable<EyebrowBadgeProps["variant"]>, string> =
  {
    loire:
      "bg-loire-deep/8 text-loire-deep ring-1 ring-loire-deep/20",
    atlas:
      "bg-atlas-clay/10 text-atlas-clay ring-1 ring-atlas-clay/20",
    bridge:
      "bg-bridge-ink/8 text-bridge-ink ring-1 ring-bridge-ink/20",
    night:
      "bg-loire-pale/10 text-atlas-cream ring-1 ring-loire-pale/25",
  };

/**
 * Eyebrow pill badge premium (per soft-skill §4C).
 * Petit, contained, qui précède un H2/H1 majeur — donne du rythme typographique.
 */
export function EyebrowBadge({
  children,
  variant = "bridge",
  className,
}: EyebrowBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.25em] font-sans font-medium",
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="w-1 h-1 rounded-full bg-current opacity-70"
      />
      {children}
    </span>
  );
}
