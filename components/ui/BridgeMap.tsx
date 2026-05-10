"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import clsx from "clsx";

type Anchor = {
  id: "orleans" | "atlas";
  label: string;
  sublabel: string;
  cx: number;
  cy: number;
  side: "loire" | "atlas";
  details: string[];
};

const ANCHORS: Anchor[] = [
  {
    id: "orleans",
    label: "Orléans",
    sublabel: "France · Val de Loire",
    cx: 200,
    cy: 220,
    side: "loire",
    details: [
      "Siège de l'association",
      "Gastronomie & vinaigriers historiques",
      "Bord de Loire — UNESCO",
    ],
  },
  {
    id: "atlas",
    label: "Haut-Atlas",
    sublabel: "Maroc · Souss-Massa",
    cx: 600,
    cy: 380,
    side: "atlas",
    details: [
      "Maison Bledi — 130 m² PMR",
      "Coopérative de savons & huiles",
      "Kiosque Solidaire — Agadir",
    ],
  },
];

/**
 * Carte stylisée représentant le pont solidaire Orléans ↔ Haut-Atlas.
 * Utilise des silhouettes simplifiées (pas une vraie projection cartographique)
 * pour rester dans une esthétique de carte ancienne / illustration.
 *
 * Chaque ancrage est cliquable et révèle ses détails.
 */
export function BridgeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState<Anchor["id"] | null>(null);

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        role="img"
        aria-label="Carte du pont solidaire entre Orléans et le Haut-Atlas"
      >
        <defs>
          <linearGradient id="sea-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-loire-mist)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-loire-deep)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="bridge-line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-loire-deep)" />
            <stop offset="50%" stopColor="var(--color-atlas-saffron)" />
            <stop offset="100%" stopColor="var(--color-atlas-clay)" />
          </linearGradient>
          <radialGradient id="anchor-loire" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--color-loire-mist)" />
            <stop offset="100%" stopColor="var(--color-loire-deep)" />
          </radialGradient>
          <radialGradient id="anchor-atlas" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--color-atlas-saffron)" />
            <stop offset="100%" stopColor="var(--color-atlas-clay)" />
          </radialGradient>
        </defs>

        {/* Mer/océan en filigrane */}
        <rect width="800" height="500" fill="url(#sea-grad)" />

        {/* Silhouette stylisée France */}
        <path
          d="M120,140 Q140,110 180,120 Q220,100 250,130 Q280,160 270,200 Q260,250 230,260 Q200,270 180,260 Q160,240 150,220 Q130,200 120,180 Z"
          fill="var(--color-loire-stone)"
          opacity="0.6"
          stroke="var(--color-loire-deep)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <text
          x="200"
          y="170"
          textAnchor="middle"
          className="font-serif"
          fontSize="11"
          fill="var(--color-loire-deep)"
          opacity="0.5"
          letterSpacing="2"
        >
          FRANCE
        </text>

        {/* Silhouette stylisée Maroc */}
        <path
          d="M520,310 Q560,290 620,310 Q680,330 700,370 Q710,410 680,440 Q640,460 590,450 Q540,440 520,400 Q510,360 520,320 Z"
          fill="var(--color-atlas-cream)"
          opacity="0.7"
          stroke="var(--color-atlas-clay)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <text
          x="610"
          y="365"
          textAnchor="middle"
          className="font-serif"
          fontSize="11"
          fill="var(--color-atlas-clay)"
          opacity="0.7"
          letterSpacing="2"
        >
          MAROC
        </text>

        {/* Trajectoire pointillée — le pont solidaire */}
        <motion.path
          d="M200,220 Q400,80 600,380"
          fill="none"
          stroke="url(#bridge-line-grad)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />

        {/* Étoile mobile qui suit la trajectoire — symbolise le va-et-vient */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <motion.circle
            r="6"
            fill="var(--color-atlas-saffron)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: ["0%", "100%", "0%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.4,
            }}
            style={{
              offsetPath: 'path("M200,220 Q400,80 600,380")',
            }}
          />
        </motion.g>

        {/* Ancrages */}
        {ANCHORS.map((a, i) => {
          const isActive = active === a.id;
          return (
            <motion.g
              key={a.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.4, duration: 0.6, type: "spring" }}
              onMouseEnter={() => setActive(a.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(isActive ? null : a.id)}
              className="cursor-pointer"
              role="button"
              aria-label={`Voir les détails de ${a.label}`}
            >
              {/* Halo pulsant */}
              <motion.circle
                cx={a.cx}
                cy={a.cy}
                r="22"
                fill={a.side === "loire" ? "var(--color-loire-mist)" : "var(--color-atlas-saffron)"}
                opacity="0.3"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Pastille */}
              <circle
                cx={a.cx}
                cy={a.cy}
                r={isActive ? 14 : 10}
                fill={`url(#anchor-${a.side})`}
                stroke="var(--color-bridge-cream)"
                strokeWidth="3"
                style={{ transition: "r 0.3s ease" }}
              />
              {/* Label */}
              <text
                x={a.cx}
                y={a.side === "loire" ? a.cy - 30 : a.cy + 35}
                textAnchor="middle"
                className="font-serif italic"
                fontSize="22"
                fontWeight="500"
                fill={a.side === "loire" ? "var(--color-loire-deep)" : "var(--color-atlas-clay)"}
              >
                {a.label}
              </text>
              <text
                x={a.cx}
                y={a.side === "loire" ? a.cy - 14 : a.cy + 50}
                textAnchor="middle"
                className="font-sans"
                fontSize="9"
                letterSpacing="2"
                fill={a.side === "loire" ? "var(--color-loire-stream)" : "var(--color-atlas-ochre)"}
              >
                {a.sublabel.toUpperCase()}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Détails de l'ancrage actif — apparaissent en bas */}
      <div className="mt-8 min-h-[120px]">
        {ANCHORS.map((a) => {
          const isActive = active === a.id;
          return (
            <motion.div
              key={a.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 10,
                pointerEvents: isActive ? "auto" : "none",
              }}
              transition={{ duration: 0.4 }}
              className={clsx(
                "absolute left-1/2 -translate-x-1/2 max-w-md px-6 py-4 rounded-2xl border bg-bridge-cream/95 backdrop-blur-sm",
                a.side === "loire"
                  ? "border-loire-deep/30"
                  : "border-atlas-clay/30",
              )}
              style={{ position: isActive ? "relative" : "absolute" }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] font-sans font-medium"
                style={{
                  color:
                    a.side === "loire"
                      ? "var(--color-loire-deep)"
                      : "var(--color-atlas-clay)",
                }}
              >
                {a.sublabel}
              </p>
              <h4 className="font-serif text-2xl mt-1 text-bridge-ink">{a.label}</h4>
              <ul className="mt-3 space-y-1 text-sm text-bridge-ink/75">
                {a.details.map((d) => (
                  <li key={d}>· {d}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
        {!active && (
          <p className="text-center text-sm text-bridge-ink/50 italic font-sans">
            Cliquez sur Orléans ou le Haut-Atlas pour explorer
          </p>
        )}
      </div>
    </div>
  );
}
