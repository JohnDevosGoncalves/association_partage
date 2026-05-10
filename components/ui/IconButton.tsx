import clsx from "clsx";

type ArrowIconProps = {
  /** Taille du cercle wrap (px) */
  size?: number;
  /** Couleur du wrapper et de l'icon (utilise les classes Tailwind ou couleurs CSS) */
  variant?: "primary" | "ghost" | "outline-light";
  /** Direction de la flèche */
  direction?: "right" | "down" | "diagonal";
  className?: string;
};

/**
 * Trailing icon "Button-in-Button" pattern (per soft-skill §4B).
 * Une flèche dans un cercle nested au lieu d'une flèche nue.
 *
 * À utiliser à la fin des CTAs ou liens textuels pour donner ce sens
 * de précision haptique — "il y a une mécanique à l'intérieur du bouton".
 */
export function ArrowIcon({
  size = 32,
  variant = "primary",
  direction = "right",
  className,
}: ArrowIconProps) {
  const rotation =
    direction === "right" ? "rotate-0" : direction === "down" ? "rotate-90" : "-rotate-45";

  const variantClass = {
    primary:
      "bg-bridge-ink/8 group-hover:bg-bridge-ink group-hover:text-bridge-cream",
    ghost:
      "bg-loire-pale/15 group-hover:bg-loire-pale/30",
    "outline-light":
      "bg-loire-pale/15 group-hover:bg-loire-pale/25 text-loire-pale",
  }[variant];

  return (
    <span
      className={clsx(
        "ml-3 inline-flex items-center justify-center rounded-full transition-all duration-500",
        "group-hover:translate-x-1 group-hover:-translate-y-px",
        variantClass,
        className,
      )}
      style={{
        width: size,
        height: size,
        transitionTimingFunction: "var(--ease-quintet)",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx("transition-transform duration-500", rotation)}
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </span>
  );
}
