"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SandGrain } from "@/components/ui/SandGrain";
import { ImpactCounter } from "@/components/ui/ImpactCounter";
import { IMPACTS } from "@/lib/data/timeline";

const FEATURES = [
  {
    title: "Accessibilité PMR totale",
    description:
      "Chambres adaptées, cuisine accessible, terrasses sans obstacle. Rampes, sanitaires aux normes, circulations larges.",
    icon: "♿",
  },
  {
    title: "Bungalows de répit",
    description:
      "Espaces dédiés aux bénéficiaires de notre ONG partenaire pour des séjours de récupération.",
    icon: "🏠",
  },
  {
    title: "Énergie solaire",
    description:
      "Toiture photovoltaïque et eau chaude solaire — autonomie complète sur l'énergie.",
    icon: "☀",
  },
  {
    title: "Recyclage des eaux",
    description:
      "Phytoépuration et récupération d'eau de pluie pour l'arrosage des cultures.",
    icon: "💧",
  },
  {
    title: "Compost intégré",
    description:
      "Cycle court : restes de cuisine vers les jardins. Zéro déchet organique.",
    icon: "🌱",
  },
  {
    title: "130 m² sur 3 niveaux",
    description:
      "Bâti pensé pour la vie en commun : grands espaces partagés, intimité préservée.",
    icon: "✦",
  },
];

export function BledisSection() {
  return (
    <SandGrain>
      <section
        id="bledi"
        className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--color-atlas-cream) 0%, var(--color-bridge-cream) 100%)",
        }}
      >
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-clay font-sans font-medium">
              Au cœur du Haut-Atlas
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
              La <em className="italic text-atlas-clay">Maison Bledi</em>
            </h2>
            <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
              Notre centre permanent au Maroc — un lieu d'accueil, d'échange et de répit,
              pensé dès la première pierre pour être totalement accessible et autosuffisant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-20">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-bridge-cream/85 backdrop-blur-sm border border-atlas-ochre/25 rounded-2xl p-7 hover:border-atlas-clay/50 transition-colors"
              >
                <div className="text-3xl mb-4 text-atlas-clay">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl text-bridge-ink mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-bridge-ink/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bandeau d'impacts chiffrés */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10 border-t border-b border-atlas-ochre/30"
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
    </SandGrain>
  );
}
