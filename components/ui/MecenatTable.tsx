"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { MECENAT_TIERS } from "@/lib/data/mecenat";

/**
 * Tableau de mécénat — 4 niveaux toujours visibles (Bronze, Argent, Or, Platinium).
 *
 * Refonte (2026-05-10) inspirée pattern 21st.dev pricing comparison :
 *  - 4 colonnes alignées, all-info-visible (plus de hover-to-reveal)
 *  - Niveau Or = "Le plus engagé", scale ↑ + bordure renforcée
 *  - Checkmarks accent par niveau, signature en bas, CTA dédié
 *  - Typographie Cormorant pour les titres, Inter pour le corps
 */
export function MecenatTable() {
  return (
    <div className="relative">
      {/* Padding-top pour laisser de la place au badge "Le plus engagé" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 items-stretch pt-5 md:pt-7">
        {MECENAT_TIERS.map((tier, i) => {
          const isFlagship = tier.id === "or";
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={clsx(
                "relative h-full",
                isFlagship && "lg:scale-[1.05] lg:z-10",
              )}
            >
              {/* Badge "Le plus engagé" — uniquement sur le tier Or */}
              {isFlagship && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span
                    className="inline-block text-[0.6rem] md:text-xs font-sans font-semibold px-4 py-1.5 rounded-full uppercase tracking-[0.25em] text-bridge-cream shadow-lg whitespace-nowrap"
                    style={{ background: tier.accent }}
                  >
                    ✦ Le plus engagé
                  </span>
                </div>
              )}

              <article
                className={clsx(
                  "relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500 bg-bridge-cream",
                  isFlagship
                    ? "shadow-2xl"
                    : "shadow-md hover:shadow-xl border border-loire-stone/50",
                )}
                style={
                  isFlagship
                    ? {
                        boxShadow: `0 25px 50px -12px ${tier.accent}55, 0 0 0 2px ${tier.accent}`,
                      }
                    : undefined
                }
              >
                {/* Header coloré */}
                <header
                  className="px-6 md:px-7 py-7 md:py-8"
                  style={{
                    background: `linear-gradient(160deg, ${tier.accent}22 0%, ${tier.accent}06 100%)`,
                    borderBottom: `2px solid ${tier.accent}`,
                  }}
                >
                  <p
                    className="text-[0.6rem] md:text-xs uppercase tracking-[0.3em] font-sans font-medium"
                    style={{ color: tier.accent }}
                  >
                    Niveau
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl mt-1 text-bridge-ink leading-none">
                    {tier.label}
                  </h3>
                  <p className="mt-3 text-sm text-bridge-ink/70 font-sans">
                    {tier.range}
                  </p>
                </header>

                {/* Liste des impacts avec checkmarks */}
                <ul
                  className="flex-grow px-6 md:px-7 py-6 space-y-3.5"
                  aria-label={`Impacts du niveau ${tier.label}`}
                >
                  {tier.impacts.map((impact, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: `${tier.accent}22` }}
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={tier.accent}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm text-bridge-ink/85 leading-relaxed">
                        {impact}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Signature */}
                <div className="px-6 md:px-7 pt-2">
                  <div
                    className="border-t pt-3 pb-1"
                    style={{ borderColor: `${tier.accent}30` }}
                  >
                    <p
                      className="text-[0.7rem] md:text-xs font-sans italic text-center leading-tight"
                      style={{ color: tier.accent }}
                    >
                      {tier.signature}
                    </p>
                  </div>
                </div>

                {/* CTA — un par niveau */}
                <div className="px-6 md:px-7 pb-7 pt-4">
                  <Link
                    href="/mecenat#contact"
                    className={clsx(
                      "block w-full py-3 px-5 rounded-full text-center text-xs md:text-sm font-sans font-semibold tracking-wide transition-all duration-300",
                      isFlagship
                        ? "text-bridge-cream shadow-md hover:shadow-lg"
                        : "border border-loire-stone hover:border-bridge-ink text-bridge-ink hover:bg-loire-pale/40",
                    )}
                    style={
                      isFlagship ? { background: tier.accent } : undefined
                    }
                    aria-label={`Choisir le niveau de mécénat ${tier.label}`}
                  >
                    {isFlagship ? "Choisir Or" : `Choisir ${tier.label}`}
                  </Link>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
