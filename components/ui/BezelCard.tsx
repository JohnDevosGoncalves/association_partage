import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type BezelCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Variant chromatique selon contexte */
  variant?: "default" | "loire" | "atlas" | "night";
};

/**
 * Double-bezel reusable (per soft-skill §4A) — outer shell + inner core.
 * Radius standard : outer 2rem, inner calc(2rem - 6px) via classes globales.
 *
 * Server Component pur : pas de hooks, pas de Framer Motion. Peut être
 * importé depuis n'importe quel server component sans hydration.
 */
export function BezelCard({
  children,
  variant = "default",
  className,
  ...rest
}: BezelCardProps) {
  const shellClass = {
    default: "bezel-shell",
    loire: "bezel-shell bezel-loire",
    atlas: "bezel-shell bezel-atlas",
    night: "bezel-shell-night",
  }[variant];

  return (
    <div className={clsx(shellClass, className)} {...rest}>
      <div className="bezel-core h-full">{children}</div>
    </div>
  );
}
