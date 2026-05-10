"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ImpactCounter } from "@/components/ui/ImpactCounter";
import { IMPACTS } from "@/lib/data/timeline";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

/**
 * Maison Bledi — Asymmetrical Bento (per soft-skill §3 Layout Archetype #1).
 *
 * Layout :
 *  - 1 grande tile "PMR" qui domine (col-span-6 row-span-2)
 *  - 4 petites tiles satellites (col-span-3 chacune, en deux groupes)
 *  - Bandeau ImpactCounter en bas pleine largeur
 *
 * Patterns :
 *  - Double-bezel architecture sur chaque tile
 *  - Eyebrow pill badge
 *  - Macro-whitespace (py-24+)
 *  - Spring physics (whileInView + custom cubic-bezier)
 *  - Tabular nums sur les chiffres
 */

type Feature = {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  size: "hero" | "wide" | "compact";
  variant: "loire" | "atlas";
};

const FEATURES: Feature[] = [
  {
    title: "Accessibilité totale PMR",
    description:
      "Rampes à 6 % maximum, sanitaires aux normes, cuisine adaptée, terrasses sans seuil. Une famille avec fauteuil traverse l'intégralité du bâtiment sans rencontrer d'obstacle.",
    metric: "0",
    metricLabel: "marche",
    size: "hero",
    variant: "atlas",
  },
  {
    title: "Énergie solaire",
    description: "Toiture photovoltaïque + eau chaude solaire toute l'année.",
    metric: "100 %",
    metricLabel: "autonomie",
    size: "compact",
    variant: "atlas",
  },
  {
    title: "Recyclage des eaux",
    description:
      "Phytoépuration des eaux grises pour l'arrosage du jardin.",
    metric: "0 L",
    metricLabel: "perdus",
    size: "compact",
    variant: "loire",
  },
  {
    title: "Bungalows de répit",
    description:
      "Espaces dédiés aux bénéficiaires de notre ONG partenaire pour des séjours de récupération.",
    metric: "2",
    metricLabel: "bungalows",
    size: "wide",
    variant: "atlas",
  },
  {
    title: "Compost intégré",
    description: "Cycle court : restes cuisine vers jardin. Zéro déchet.",
    size: "compact",
    variant: "atlas",
  },
  {
    title: "130 m² sur 3 niveaux",
    description: "Bâti pensé pour la vie en commun.",
    metric: "3",
    metricLabel: "niveaux",
    size: "compact",
    variant: "loire",
  },
];

const sizeToColSpan = {
  hero: "md:col-span-12 lg:col-span-7 lg:row-span-2",
  wide: "md:col-span-6 lg:col-span-5",
  compact: "md:col-span-6 lg:col-span-3",
} as const;

export function BledisSection() {
  return (
    <section
      id="bledi"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center top, #f4e4c1 0%, #f8f4ed 50%, #f1ecdf 100%)",
      }}
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* En-tête éditorial — left-aligned (anti-center bias) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <EyebrowBadge variant="atlas" className="mb-5">
            Au cœur du Haut-Atlas
          </EyebrowBadge>
          <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
            La Maison{" "}
            <em className="italic font-extralight text-atlas-clay">Bledi</em>
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-lg text-bridge-ink/70 max-w-[60ch] leading-[1.55] font-light">
            Notre centre permanent au Haut-Atlas — un lieu d'accueil pensé dès
            la première pierre pour être totalement accessible et autosuffisant
            en énergie.
          </p>
        </motion.div>

        {/* Bento grid asymétrique */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-rows-[auto_auto] gap-4 md:gap-5">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={`bezel-shell bezel-${feature.variant} ${sizeToColSpan[feature.size]}`}
            >
              <div className="bezel-core h-full p-6 md:p-8 lg:p-10 flex flex-col">
                {feature.metric && (
                  <div
                    className="mb-5 md:mb-6 flex items-baseline gap-2"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <span
                      className={`font-serif font-light leading-none ${
                        feature.size === "hero"
                          ? "text-5xl md:text-7xl"
                          : "text-3xl md:text-4xl"
                      } ${
                        feature.variant === "atlas"
                          ? "text-atlas-clay"
                          : "text-loire-deep"
                      }`}
                    >
                      {feature.metric}
                    </span>
                    {feature.metricLabel && (
                      <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-bridge-ink/50 font-sans">
                        {feature.metricLabel}
                      </span>
                    )}
                  </div>
                )}

                <h3
                  className={`font-serif text-bridge-ink leading-tight ${
                    feature.size === "hero"
                      ? "text-2xl md:text-4xl font-light"
                      : "text-xl md:text-2xl font-normal"
                  }`}
                  style={{ textWrap: "balance" }}
                >
                  {feature.title}
                </h3>

                <p
                  className={`mt-3 md:mt-4 text-bridge-ink/70 leading-relaxed font-sans font-light ${
                    feature.size === "hero" ? "text-base md:text-lg" : "text-sm"
                  }`}
                  style={{ textWrap: "pretty" }}
                >
                  {feature.description}
                </p>

                {/* Filet décoratif animé pour la tile hero */}
                {feature.size === "hero" && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.4,
                      delay: 0.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="mt-auto pt-8 md:pt-10 origin-left"
                  >
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-atlas-clay) 0%, transparent 100%)",
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bandeau impacts chiffrés — full width séparé */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 md:py-12 border-t border-atlas-ochre/25 border-b"
        >
          {IMPACTS.map((impact) => (
            <ImpactCounter
              key={impact.label}
              value={impact.value}
              suffix={impact.suffix}
              label={impact.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
