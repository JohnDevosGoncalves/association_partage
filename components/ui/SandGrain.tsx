import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type SandGrainProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Couvre ses enfants d'une fine couche de "grain de sable"
 * pour les sections évoquant le Maroc/Atlas.
 */
export function SandGrain({ children, className, ...rest }: SandGrainProps) {
  return (
    <div className={clsx("sand-grain", className)} {...rest}>
      {children}
    </div>
  );
}
