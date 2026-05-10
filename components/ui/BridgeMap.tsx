"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import clsx from "clsx";

type Anchor = {
  id: "orleans" | "atlas";
  label: string;
  sublabel: string;
  cx: number;
  cy: number;
  side: "loire" | "atlas";
  details: { value: string; label: string }[];
  description: string;
};

const ANCHORS: Anchor[] = [
  {
    id: "orleans",
    label: "Orléans",
    sublabel: "France · 47.9°N",
    cx: 280,
    cy: 220,
    side: "loire",
    description:
      "Siège historique. Bord de Loire, vinaigrerie Martin-Pouret depuis 1797, gastronomie ligérienne.",
    details: [
      { value: "2015", label: "Année de fondation" },
      { value: "30", label: "Cartables / rentrée" },
      { value: "100 %", label: "Bénévolat" },
    ],
  },
  {
    id: "atlas",
    label: "Haut-Atlas",
    sublabel: "Maroc · 31.0°N",
    cx: 920,
    cy: 460,
    side: "atlas",
    description:
      "Maison Bledi : 130 m² PMR, autosuffisance solaire, coopérative femmes, kiosque Agadir.",
    details: [
      { value: "300", label: "Jours de soleil/an" },
      { value: "130 m²", label: "Centre PMR" },
      { value: "2 700 km", label: "Distance Orléans" },
    ],
  },
];

/**
 * Carte du pont solidaire — refonte cinématique (2026-05-10).
 *
 * Concept : carte céleste / blueprint d'astronome, fond cosmique profond,
 * arc géodésique pulsant entre Orléans et le Haut-Atlas, particules de
 * données qui voyagent en permanence dans les deux sens (symbolise les
 * échanges constants), panneaux glassmorphism qui révèlent les stats au
 * survol des marqueurs.
 *
 * Aucune dépendance 3D — SVG pur + Framer Motion. Reste léger et performant.
 */
export function BridgeMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Anchor["id"] | null>(null);

  // Path de l'arc géodésique (courbe quadratique stylisée)
  const arcPath = "M 280 220 Q 600 80 920 460";

  // Étoiles d'arrière-plan (memoizées pour ne pas re-générer à chaque render)
  const stars = useMemo(() => {
    const list: { cx: number; cy: number; r: number; delay: number }[] = [];
    for (let i = 0; i < 50; i++) {
      list.push({
        cx: Math.random() * 1200,
        cy: Math.random() * 700,
        r: Math.random() * 1.4 + 0.3,
        delay: Math.random() * 4,
      });
    }
    return list;
  }, []);

  // Particules qui voyagent sur l'arc (memoizées)
  const particles = useMemo(() => {
    return [
      { delay: 0, duration: 7, direction: "forward" as const, size: 3 },
      { delay: 1.5, duration: 8, direction: "forward" as const, size: 2 },
      { delay: 3, duration: 7, direction: "forward" as const, size: 2.5 },
      { delay: 0.7, duration: 8, direction: "reverse" as const, size: 2.5 },
      { delay: 2.2, duration: 7, direction: "reverse" as const, size: 2 },
      { delay: 4, duration: 9, direction: "reverse" as const, size: 3 },
    ];
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox="0 0 1200 700"
        className="w-full h-auto"
        role="img"
        aria-label="Carte du pont solidaire entre Orléans et le Haut-Atlas"
      >
        <defs>
          {/* Fond cosmique profond */}
          <radialGradient id="cosmic-bg" cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="60%" stopColor="#050a1a" />
            <stop offset="100%" stopColor="#020510" />
          </radialGradient>

          {/* Lueur saffron pour l'arc */}
          <linearGradient id="arc-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7a9cb8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e8a33d" stopOpacity="1" />
            <stop offset="100%" stopColor="#c8553d" stopOpacity="0.95" />
          </linearGradient>

          {/* Halo Orléans */}
          <radialGradient id="halo-loire">
            <stop offset="0%" stopColor="#7a9cb8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7a9cb8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-atlas">
            <stop offset="0%" stopColor="#e8a33d" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e8a33d" stopOpacity="0" />
          </radialGradient>

          {/* Anchor radial */}
          <radialGradient id="anchor-loire" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f1ecdf" />
            <stop offset="50%" stopColor="#7a9cb8" />
            <stop offset="100%" stopColor="#1b3a5b" />
          </radialGradient>
          <radialGradient id="anchor-atlas" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f4e4c1" />
            <stop offset="50%" stopColor="#e8a33d" />
            <stop offset="100%" stopColor="#8b3a2a" />
          </radialGradient>

          {/* Bruit subtil */}
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0" />
          </filter>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fond cosmique */}
        <rect width="1200" height="700" fill="url(#cosmic-bg)" />
        <rect width="1200" height="700" filter="url(#noise)" opacity="0.5" />

        {/* Étoiles d'arrière-plan */}
        <g aria-hidden="true">
          {stars.map((star, i) => (
            <motion.circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#f1ecdf"
              animate={
                inView
                  ? { opacity: [0.2, 0.9, 0.2] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 3 + star.delay,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Lignes méridien décoratives (style carte céleste) */}
        <g
          stroke="rgba(241, 236, 223, 0.06)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          fill="none"
        >
          <path d="M 0 200 Q 600 250 1200 200" />
          <path d="M 0 350 Q 600 400 1200 350" />
          <path d="M 0 500 Q 600 550 1200 500" />
          <line x1="200" y1="0" x2="200" y2="700" />
          <line x1="600" y1="0" x2="600" y2="700" />
          <line x1="1000" y1="0" x2="1000" y2="700" />
        </g>

        {/* Silhouette continent stylisée Europe/France */}
        <motion.path
          d="M 130 140 Q 175 110 220 130 Q 280 110 330 145 Q 360 180 340 220 Q 330 260 290 270 Q 240 280 200 265 Q 160 250 145 220 Q 120 180 130 140 Z"
          fill="rgba(122, 156, 184, 0.10)"
          stroke="rgba(122, 156, 184, 0.45)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <text
          x="230"
          y="100"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="3"
          fill="rgba(122, 156, 184, 0.7)"
          className="font-serif"
        >
          FRANCE · LOIRE
        </text>

        {/* Silhouette continent stylisée Afrique du Nord/Maroc */}
        <motion.path
          d="M 800 380 Q 860 360 920 380 Q 990 395 1040 430 Q 1080 470 1060 510 Q 1030 550 970 555 Q 900 560 850 545 Q 800 530 790 500 Q 780 440 800 380 Z"
          fill="rgba(232, 163, 61, 0.10)"
          stroke="rgba(232, 163, 61, 0.45)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        <text
          x="930"
          y="600"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="3"
          fill="rgba(232, 163, 61, 0.75)"
          className="font-serif"
        >
          MAROC · ATLAS
        </text>

        {/* L'arc géodésique principal — pulse + glow */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke="url(#arc-glow)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Arc pointillé doublé (effet trace) */}
        <motion.path
          d={arcPath}
          fill="none"
          stroke="rgba(244, 228, 193, 0.4)"
          strokeWidth="1"
          strokeDasharray="2 6"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, delay: 0.8, ease: "easeInOut" }}
        />

        {/* Particules de données qui voyagent en boucle */}
        {particles.map((p, i) => {
          const offsetKeyframes =
            p.direction === "forward"
              ? ["0%", "100%"]
              : ["100%", "0%"];
          return (
            <motion.circle
              key={`particle-${i}`}
              r={p.size}
              fill={p.direction === "forward" ? "#f4e4c1" : "#7a9cb8"}
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? {
                      opacity: [0, 1, 1, 0],
                      offsetDistance: offsetKeyframes,
                    }
                  : {}
              }
              transition={{
                opacity: {
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay + 2,
                  ease: "linear",
                  times: [0, 0.1, 0.9, 1],
                },
                offsetDistance: {
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay + 2,
                  ease: "linear",
                },
              }}
              style={{
                offsetPath: `path("${arcPath}")`,
              }}
            />
          );
        })}

        {/* Indicateur de distance au sommet de l'arc */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.6 }}
        >
          <line
            x1="600"
            y1="105"
            x2="600"
            y2="125"
            stroke="rgba(244, 228, 193, 0.6)"
            strokeWidth="1"
          />
          <text
            x="600"
            y="100"
            textAnchor="middle"
            fontSize="11"
            fill="#f4e4c1"
            className="font-serif italic"
          >
            2 700 km
          </text>
          <text
            x="600"
            y="142"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="2"
            fill="rgba(244, 228, 193, 0.6)"
            className="font-sans"
          >
            PONT SOLIDAIRE
          </text>
        </motion.g>

        {/* Anchors : Orléans + Haut-Atlas */}
        {ANCHORS.map((a, i) => {
          const isActive = active === a.id;
          return (
            <motion.g
              key={a.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 1 + i * 0.5,
                duration: 0.7,
                type: "spring",
                stiffness: 120,
              }}
              onMouseEnter={() => setActive(a.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(a.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : a.id)}
              tabIndex={0}
              role="button"
              aria-label={`Voir les détails de ${a.label}`}
              className="cursor-pointer focus:outline-none"
            >
              {/* Halo (cercle large pulse) */}
              <circle
                cx={a.cx}
                cy={a.cy}
                r="60"
                fill={`url(#halo-${a.side})`}
                aria-hidden="true"
              />
              <motion.circle
                cx={a.cx}
                cy={a.cy}
                r="35"
                fill="none"
                stroke={a.side === "loire" ? "#7a9cb8" : "#e8a33d"}
                strokeWidth="0.6"
                animate={{
                  r: [25, 60, 25],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.5,
                }}
                aria-hidden="true"
              />
              {/* Anneau au survol */}
              <motion.circle
                cx={a.cx}
                cy={a.cy}
                r="30"
                fill="none"
                stroke={a.side === "loire" ? "#f1ecdf" : "#f4e4c1"}
                strokeWidth="1"
                strokeDasharray="2 4"
                animate={{
                  opacity: isActive ? 1 : 0,
                  rotate: isActive ? 360 : 0,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{ transformOrigin: `${a.cx}px ${a.cy}px` }}
                aria-hidden="true"
              />
              {/* Pastille */}
              <circle
                cx={a.cx}
                cy={a.cy}
                r="11"
                fill={`url(#anchor-${a.side})`}
                stroke="#f1ecdf"
                strokeWidth="2"
                filter="url(#glow)"
              />
              {/* Point central */}
              <circle cx={a.cx} cy={a.cy} r="3" fill="#f1ecdf" />

              {/* Labels */}
              <text
                x={a.cx}
                y={a.side === "loire" ? a.cy - 80 : a.cy + 90}
                textAnchor="middle"
                fontSize="28"
                fontWeight="300"
                fill={a.side === "loire" ? "#f1ecdf" : "#f4e4c1"}
                className="font-serif italic"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}
              >
                {a.label}
              </text>
              <text
                x={a.cx}
                y={a.side === "loire" ? a.cy - 60 : a.cy + 110}
                textAnchor="middle"
                fontSize="10"
                letterSpacing="3"
                fill={
                  a.side === "loire"
                    ? "rgba(241, 236, 223, 0.7)"
                    : "rgba(244, 228, 193, 0.75)"
                }
                className="font-sans"
              >
                {a.sublabel.toUpperCase()}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Panneaux glassmorphism qui révèlent les détails au survol/clic */}
      <div className="relative -mt-12 md:-mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-8">
        {ANCHORS.map((a) => {
          const isActive = active === a.id;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className={clsx(
                "relative rounded-2xl backdrop-blur-md border overflow-hidden transition-all duration-500",
                isActive
                  ? "scale-[1.02] shadow-2xl"
                  : "shadow-lg",
              )}
              style={{
                background: isActive
                  ? a.side === "loire"
                    ? "linear-gradient(135deg, rgba(27, 58, 91, 0.85), rgba(45, 90, 130, 0.6))"
                    : "linear-gradient(135deg, rgba(139, 58, 42, 0.85), rgba(200, 85, 61, 0.6))"
                  : "linear-gradient(135deg, rgba(5, 10, 26, 0.75), rgba(10, 22, 40, 0.55))",
                borderColor: isActive
                  ? a.side === "loire"
                    ? "#7a9cb8"
                    : "#e8a33d"
                  : "rgba(241, 236, 223, 0.15)",
              }}
            >
              <div className="p-6 md:p-7 text-loire-pale">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p
                      className="text-[0.65rem] uppercase tracking-[0.3em] font-sans font-medium mb-1"
                      style={{
                        color:
                          a.side === "loire" ? "#f1ecdf" : "#f4e4c1",
                      }}
                    >
                      {a.sublabel}
                    </p>
                    <h3 className="font-serif italic text-3xl md:text-4xl text-loire-pale leading-none">
                      {a.label}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "w-3 h-3 rounded-full transition-all duration-500",
                      isActive ? "scale-150" : "scale-100",
                    )}
                    style={{
                      background:
                        a.side === "loire" ? "#7a9cb8" : "#e8a33d",
                      boxShadow: `0 0 20px ${a.side === "loire" ? "#7a9cb8" : "#e8a33d"}`,
                    }}
                  />
                </div>

                <p className="text-sm text-loire-pale/85 leading-relaxed mb-5">
                  {a.description}
                </p>

                <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-loire-pale/15">
                  {a.details.map((d) => (
                    <div key={d.label} className="text-center">
                      <dt className="font-serif text-xl md:text-2xl font-light text-loire-pale leading-none">
                        {d.value}
                      </dt>
                      <dd className="mt-1.5 text-[0.55rem] uppercase tracking-[0.15em] text-loire-pale/65 font-sans leading-tight">
                        {d.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
