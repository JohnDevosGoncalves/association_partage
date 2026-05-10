"use client";

import { useState, type PointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { MECENAT_TIERS, type MecenatTier } from "@/lib/data/mecenat";

/**
 * Tableau de mécénat interactif — 4 niveaux.
 *
 * Desktop : survol pointer:fine met en avant un niveau.
 * Tactile : tap unique alterne ouvert/fermé. Pas de mouseenter parasite
 *           (on filtre via pointerType pour ne pas piéger les tap).
 */
export function MecenatTable() {
  const [active, setActive] = useState<MecenatTier["id"] | null>("or");

  // N'ouvre au survol que pour les souris/trackpads — sur tactile, le tap gère.
  const handlePointerEnter = (
    e: PointerEvent<HTMLButtonElement>,
    id: MecenatTier["id"],
  ) => {
    if (e.pointerType === "mouse") setActive(id);
  };

  const handleClick = (id: MecenatTier["id"]) => {
    setActive((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-2">
        {MECENAT_TIERS.map((tier) => {
          const isActive = tier.id === active;
          return (
            <button
              key={tier.id}
              type="button"
              onPointerEnter={(e) => handlePointerEnter(e, tier.id)}
              onClick={() => handleClick(tier.id)}
              aria-pressed={isActive}
              aria-expanded={isActive}
              className={clsx(
                "relative text-left rounded-2xl p-5 md:p-8 transition-all duration-500 border-2 overflow-hidden",
                isActive
                  ? "md:scale-[1.04] shadow-xl"
                  : "opacity-80 hover:opacity-100",
              )}
              style={{
                borderColor: isActive ? tier.accent : "transparent",
                background: isActive
                  ? `linear-gradient(160deg, ${tier.accent}18 0%, var(--color-bridge-cream) 100%)`
                  : "var(--color-bridge-cream)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: tier.accent }}
              />

              <div className="flex items-baseline justify-between gap-3">
                <p
                  className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] font-sans font-medium"
                  style={{ color: tier.accent }}
                >
                  Niveau
                </p>
                {/* Indicateur "tappable" — visible mobile uniquement quand fermé */}
                <span
                  className={clsx(
                    "md:hidden text-xs font-sans transition-transform duration-300",
                    isActive ? "rotate-45" : "rotate-0",
                  )}
                  style={{ color: tier.accent }}
                  aria-hidden="true"
                >
                  +
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-4xl mt-2 text-bridge-ink leading-none">
                {tier.label}
              </h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-bridge-ink/70 font-sans">
                {tier.range}
              </p>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ul className="mt-5 md:mt-6 space-y-2.5 md:space-y-3 text-sm text-bridge-ink/85">
                      {tier.impacts.map((impact, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed">
                          <span
                            className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: tier.accent }}
                          />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                    <p
                      className="mt-5 pt-4 border-t text-xs italic font-sans"
                      style={{
                        borderColor: `${tier.accent}40`,
                        color: tier.accent,
                      }}
                    >
                      ✦ {tier.signature}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
