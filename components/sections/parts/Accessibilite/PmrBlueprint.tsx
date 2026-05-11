"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { PMR_FEATURES, type PmrFeature } from "@/lib/data/accessibility";

/**
 * Plan stylisé interactif de la Maison Bledi avec pins PMR.
 *
 * Layout : SVG schéma à gauche (col-span-7) + détail du pin actif à droite
 * (col-span-5). Click sur un pin → met à jour le détail.
 * Hover → preview discret. Animation pulse permanente sur les pins.
 */
export function PmrBlueprint() {
  const [activeId, setActiveId] = useState<PmrFeature["id"]>(
    PMR_FEATURES[0].id,
  );
  const active = PMR_FEATURES.find((f) => f.id === activeId) ?? PMR_FEATURES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      {/* Plan SVG */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-bridge-ink ring-1 ring-loire-pale/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
          {/* Grille blueprint */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 75"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 5 0 L 0 0 0 5"
                  fill="none"
                  stroke="rgba(232, 163, 61, 0.08)"
                  strokeWidth="0.1"
                />
              </pattern>
            </defs>
            <rect width="100" height="75" fill="url(#grid)" />
          </svg>

          {/* Plan du bâtiment — schéma rectangulaire stylisé */}
          <svg
            viewBox="0 0 100 75"
            className="absolute inset-0 w-full h-full"
            role="img"
            aria-label="Plan stylisé de la Maison Bledi avec aménagements PMR"
          >
            {/* Contour principal */}
            <rect
              x="12"
              y="18"
              width="76"
              height="50"
              fill="none"
              stroke="rgba(232, 163, 61, 0.55)"
              strokeWidth="0.4"
              rx="1"
            />
            {/* Cloisons */}
            <line
              x1="42"
              y1="18"
              x2="42"
              y2="38"
              stroke="rgba(232, 163, 61, 0.35)"
              strokeWidth="0.25"
            />
            <line
              x1="42"
              y1="48"
              x2="42"
              y2="68"
              stroke="rgba(232, 163, 61, 0.35)"
              strokeWidth="0.25"
            />
            <line
              x1="65"
              y1="18"
              x2="65"
              y2="48"
              stroke="rgba(232, 163, 61, 0.35)"
              strokeWidth="0.25"
            />
            <line
              x1="12"
              y1="40"
              x2="42"
              y2="40"
              stroke="rgba(232, 163, 61, 0.35)"
              strokeWidth="0.25"
            />
            <line
              x1="65"
              y1="40"
              x2="88"
              y2="40"
              stroke="rgba(232, 163, 61, 0.35)"
              strokeWidth="0.25"
            />
            {/* Entrée (ouverture en bas) */}
            <line
              x1="22"
              y1="68"
              x2="32"
              y2="68"
              stroke="var(--color-bridge-ink)"
              strokeWidth="0.6"
            />
            <line
              x1="22"
              y1="68"
              x2="22"
              y2="74"
              stroke="rgba(232, 163, 61, 0.4)"
              strokeWidth="0.25"
              strokeDasharray="0.5 0.5"
            />
            <line
              x1="32"
              y1="68"
              x2="32"
              y2="74"
              stroke="rgba(232, 163, 61, 0.4)"
              strokeWidth="0.25"
              strokeDasharray="0.5 0.5"
            />

            {/* Labels des pièces */}
            <text x="27" y="32" fontSize="2" fill="rgba(241, 236, 223, 0.4)" textAnchor="middle" className="font-sans">
              Cuisine
            </text>
            <text x="53" y="32" fontSize="2" fill="rgba(241, 236, 223, 0.4)" textAnchor="middle" className="font-sans">
              Salon
            </text>
            <text x="76" y="32" fontSize="2" fill="rgba(241, 236, 223, 0.4)" textAnchor="middle" className="font-sans">
              Chambres
            </text>
            <text x="76" y="58" fontSize="2" fill="rgba(241, 236, 223, 0.4)" textAnchor="middle" className="font-sans">
              SDB
            </text>
            <text x="27" y="58" fontSize="2" fill="rgba(241, 236, 223, 0.4)" textAnchor="middle" className="font-sans">
              Terrasse
            </text>

            {/* Pins interactifs */}
            {PMR_FEATURES.map((feature) => {
              const isActive = feature.id === activeId;
              return (
                <g
                  key={feature.id}
                  onClick={() => setActiveId(feature.id)}
                  onMouseEnter={() => setActiveId(feature.id)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Voir le détail : ${feature.title}`}
                >
                  {/* Halo pulsant */}
                  <motion.circle
                    cx={feature.pin.x}
                    cy={feature.pin.y}
                    r={isActive ? 3.5 : 2}
                    fill="var(--color-atlas-saffron)"
                    opacity="0.25"
                    animate={{
                      r: [2, 4, 2],
                      opacity: [0.25, 0, 0.25],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: PMR_FEATURES.indexOf(feature) * 0.3,
                    }}
                  />
                  {/* Pin */}
                  <circle
                    cx={feature.pin.x}
                    cy={feature.pin.y}
                    r={isActive ? 1.4 : 1}
                    fill="var(--color-atlas-saffron)"
                    stroke="var(--color-loire-pale)"
                    strokeWidth="0.2"
                    style={{ transition: "r 0.3s var(--ease-quintet)" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Eyebrow blueprint label */}
          <div className="absolute top-4 left-4 text-[0.55rem] uppercase tracking-[0.3em] text-atlas-saffron font-sans font-medium">
            Plan PMR · Maison Bledi
          </div>
          <div className="absolute top-4 right-4 text-[0.55rem] uppercase tracking-[0.3em] text-loire-pale/40 font-sans">
            130 m² · 3 niveaux
          </div>
        </div>
      </div>

      {/* Détail du pin actif */}
      <div className="lg:col-span-5 lg:pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-atlas-saffron font-sans font-medium">
              {active.room} · Niveau {active.level}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-bridge-ink mt-3 leading-[1.1]">
              {active.title}
            </h3>
            <div className="my-5 h-px w-12 bg-atlas-saffron" />
            <p className="text-base md:text-[1.05rem] text-bridge-ink/75 leading-[1.7] font-light">
              {active.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-bridge-ink/5 ring-1 ring-bridge-ink/10 text-[0.65rem] uppercase tracking-[0.2em] text-bridge-ink/70 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-atlas-saffron" />
              {active.spec}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Liste compacte des autres pins */}
        <div className="mt-10 pt-8 border-t border-bridge-ink/15">
          <p className="text-[0.55rem] uppercase tracking-[0.35em] text-bridge-ink/40 font-sans mb-4">
            Naviguez dans les aménagements
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {PMR_FEATURES.map((feature) => (
              <li key={feature.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(feature.id)}
                  onMouseEnter={() => setActiveId(feature.id)}
                  className={clsx(
                    "w-full text-left text-xs px-3 py-2 rounded-md transition-colors duration-300",
                    feature.id === activeId
                      ? "bg-atlas-saffron/10 text-bridge-ink font-medium"
                      : "text-bridge-ink/55 hover:text-bridge-ink hover:bg-bridge-ink/5",
                  )}
                >
                  {feature.room}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
