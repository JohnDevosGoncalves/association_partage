"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/lib/ThemeContext";

type Props = {
  children: ReactNode;
};

/**
 * Sub-client de AstronomieSection — la coque <section> qui dépend de useTheme().
 *
 * Concentre tout ce qui doit lire le thème en runtime :
 *  - background radial (jour vs nuit)
 *  - opacity du SVG constellations
 *
 * Le reste de la section (header, bento, etc.) est rendu serveur via children.
 *
 * Pourquoi pas du CSS pur via html[data-theme="night"] ? Les valeurs de
 * background utilisent des stops radial-gradient personnalisés différents
 * (centre de l'ellipse, couleurs intermédiaires) entre jour et nuit, et
 * l'opacité du <svg> change aussi. Cela tiendrait dans des custom properties,
 * mais l'ergonomie de maintenance reste plus claire en JS.
 */
export function AstronomieThemedShell({ children }: Props) {
  const { theme } = useTheme();
  const isNight = theme === "night";

  return (
    <section
      id="astronomie"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden transition-colors duration-1000"
      style={{
        background: isNight
          ? "radial-gradient(ellipse at center, #0d1530 0%, #050a1a 60%, #020510 100%)"
          : "radial-gradient(ellipse at center, #1f2d4d 0%, #1b3a5b 50%, #0d1c33 100%)",
      }}
    >
      {/* Constellations en arrière-plan — révélées en mode nuit */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: isNight ? 0.6 : 0.18 }}
        aria-hidden="true"
      >
        {/* Grande Ourse */}
        <g
          stroke="var(--color-night-star)"
          strokeWidth="0.8"
          fill="var(--color-night-star)"
          opacity="0.7"
        >
          <line x1="180" y1="120" x2="240" y2="160" strokeOpacity="0.4" />
          <line x1="240" y1="160" x2="320" y2="140" strokeOpacity="0.4" />
          <line x1="320" y1="140" x2="400" y2="180" strokeOpacity="0.4" />
          <line x1="400" y1="180" x2="450" y2="240" strokeOpacity="0.4" />
          <line x1="450" y1="240" x2="380" y2="270" strokeOpacity="0.4" />
          <line x1="380" y1="270" x2="400" y2="180" strokeOpacity="0.4" />
          {[
            [180, 120],
            [240, 160],
            [320, 140],
            [400, 180],
            [450, 240],
            [380, 270],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2"
              className="star-twinkle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
        {/* Orion */}
        <g
          stroke="var(--color-night-star)"
          strokeWidth="0.8"
          fill="var(--color-night-star)"
          opacity="0.7"
        >
          <line x1="1100" y1="180" x2="1170" y2="260" strokeOpacity="0.4" />
          <line x1="1170" y1="260" x2="1240" y2="180" strokeOpacity="0.4" />
          <line x1="1130" y1="350" x2="1190" y2="350" strokeOpacity="0.4" />
          <line x1="1190" y1="350" x2="1250" y2="350" strokeOpacity="0.4" />
          <line x1="1170" y1="260" x2="1170" y2="450" strokeOpacity="0.4" />
          {[
            [1100, 180],
            [1170, 260],
            [1240, 180],
            [1130, 350],
            [1190, 350],
            [1250, 350],
            [1170, 450],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="2"
              className="star-twinkle"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>
      </svg>

      {children}
    </section>
  );
}
