"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data/timeline";
import { fadeInUp } from "@/lib/animations";
import clsx from "clsx";

/**
 * Section "Histoire" — du Sri Lanka 2015 à aujourd'hui.
 * Timeline verticale avec couleurs qui basculent du froid (Loire) au chaud (Atlas).
 *
 * Mobile  : ligne à gauche (16px), pastilles à 16px, contenu à droite.
 * Desktop : ligne centrale, alternance gauche/droite.
 */
export function HistoireSection() {
  return (
    <section
      id="histoire"
      className="relative py-16 md:py-28 px-5 md:px-6 bg-bridge-cream overflow-hidden"
    >
      {/* Décor : courbes Loire en filigrane */}
      <svg
        className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] opacity-[0.06]"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="150" stroke="var(--color-loire-deep)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="110" stroke="var(--color-loire-deep)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="70" stroke="var(--color-loire-deep)" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-20"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-loire-deep font-sans font-medium">
            Le voyage commence en 2015
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            Une <em className="italic text-atlas-clay">histoire</em> de partage
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/70 max-w-2xl mx-auto leading-relaxed">
            Tout commence à Orléans, au bord de la Loire, par un geste simple :
            offrir à des enfants l'accès à l'école. Dix ans plus tard, ce geste
            est devenu un pont entre la France, le Sri Lanka et le Maroc.
          </p>
        </motion.div>

        <div className="relative">
          {/* Ligne verticale — à gauche sur mobile, centrée sur desktop */}
          <div
            className="absolute top-0 bottom-0 w-px left-4 md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-loire-deep), var(--color-loire-stream), var(--color-atlas-ochre), var(--color-atlas-saffron))",
            }}
            aria-hidden="true"
          />

          <ul className="space-y-12 md:space-y-24">
            {TIMELINE.map((event, i) => {
              const isLeft = i % 2 === 0;
              const accentClass =
                event.side === "loire"
                  ? "text-loire-deep border-loire-deep"
                  : event.side === "atlas"
                    ? "text-atlas-clay border-atlas-clay"
                    : "text-atlas-ochre border-atlas-ochre";
              const dotColor =
                event.side === "loire"
                  ? "var(--color-loire-deep)"
                  : event.side === "atlas"
                    ? "var(--color-atlas-clay)"
                    : "var(--color-atlas-ochre)";
              return (
                <motion.li
                  key={event.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={clsx(
                    "relative flex flex-col md:flex-row md:items-center gap-6",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  {/* Pastille — à gauche sur mobile, au centre sur desktop */}
                  <div
                    className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-bridge-cream"
                    style={{
                      background: dotColor,
                      boxShadow: "0 0 0 4px var(--color-bridge-cream)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Contenu — décalé du rail à gauche sur mobile */}
                  <div className="pl-12 md:pl-0 md:w-1/2 md:px-12">
                    <div
                      className={clsx(
                        "inline-block px-3 md:px-4 py-1 rounded-full border text-[0.65rem] md:text-xs font-sans tracking-[0.2em] uppercase mb-3",
                        accentClass,
                      )}
                    >
                      {event.year}
                    </div>
                    <h3 className="font-serif text-xl md:text-3xl text-bridge-ink leading-snug">
                      {event.title}
                    </h3>
                    <p className="mt-2 md:mt-3 text-sm md:text-base text-bridge-ink/75 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
