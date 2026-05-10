"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTheme } from "@/lib/ThemeContext";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { ArrowIcon } from "@/components/ui/IconButton";

/**
 * Astronomie — Bento 2x2 cosmique avec 1 grande tile centrale + 3 satellites.
 *
 * Patterns appliqués :
 *  - Vibe Archetype "Ethereal Glass" (deep night bg + radial gradients)
 *  - Bento avec sizes variés (1 hero + 3 compact)
 *  - Custom cubic-bezier
 *  - Tabular nums sur stats
 *  - Spring + blur reveal au scroll
 */

const STATS = [
  { value: "300", suffix: "j", label: "soleil par an" },
  { value: "1", suffix: "", label: "télescope Unistellar" },
  { value: "∞", suffix: "", label: "ciels limpides" },
];

const FEATURES = [
  {
    title: "Observation citoyenne",
    text: "Les données collectées contribuent à des programmes scientifiques internationaux.",
    icon: "search",
  },
  {
    title: "Pédagogie locale",
    text: "Ateliers d'astronomie pour les enfants, en arabe et berbère.",
    icon: "book",
  },
  {
    title: "Tourisme solidaire",
    text: "Soirées d'observation ouvertes aux mécènes en visite.",
    icon: "moon",
  },
];

export function AstronomieSection() {
  const { theme, toggle } = useTheme();
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

      <div className="relative max-w-[1400px] mx-auto text-loire-pale">
        {/* En-tête — left-aligned éditorial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <EyebrowBadge variant="night" className="mb-5">
            Partenariat Unistellar
          </EyebrowBadge>
          <h2 className="font-serif font-light leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
            Le ciel du{" "}
            <em className="italic font-extralight text-atlas-saffron">
              Haut-Atlas
            </em>
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-lg text-loire-pale/75 max-w-[60ch] leading-[1.55] font-light">
            300 jours de soleil par an, et autant de nuits limpides. La Maison
            Bledi accueille un télescope connecté Unistellar — chaque enfant
            du village peut observer Saturne, la Lune, les amas d'étoiles.
          </p>
        </motion.div>

        {/* Bento : 1 hero card stats + 3 features */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Hero stat tile — 1/2 left */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            className="md:col-span-12 lg:col-span-7 lg:row-span-2"
          >
            <div
              className="relative h-full rounded-[2rem] p-1.5 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232, 163, 61, 0.25), rgba(122, 156, 184, 0.15))",
                boxShadow:
                  "0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 0 1px rgba(241, 236, 223, 0.08)",
              }}
            >
              <div
                className="relative h-full p-8 md:p-10 lg:p-12 rounded-[calc(2rem-6px)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(13, 21, 48, 0.95), rgba(5, 10, 26, 0.85))",
                }}
              >
                <div className="flex flex-col h-full justify-between gap-8">
                  <div>
                    <div
                      className="font-serif text-[5rem] md:text-[7rem] lg:text-[9rem] font-extralight text-atlas-saffron leading-[0.85] tabular"
                    >
                      300
                    </div>
                    <div className="mt-2 text-sm md:text-base uppercase tracking-[0.25em] text-loire-pale/70 font-sans">
                      jours de soleil par an
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-10 gap-y-5 pt-6 border-t border-loire-pale/15">
                    {STATS.slice(1).map((s) => (
                      <div key={s.label} className="flex flex-col">
                        <span className="font-serif text-3xl md:text-4xl font-light text-loire-pale tabular leading-none">
                          {s.value}
                        </span>
                        <span className="mt-1.5 text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-loire-pale/55 font-sans">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Halo lumineux décoratif */}
                <div
                  className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-25 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, var(--color-atlas-saffron), transparent 65%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>

          {/* 3 feature tiles satellites */}
          {FEATURES.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.1,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="md:col-span-4 lg:col-span-5"
              style={{
                gridColumn: i === 0 ? undefined : undefined,
              }}
            >
              <div
                className="relative rounded-[2rem] p-1.5 h-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(241, 236, 223, 0.08), rgba(241, 236, 223, 0.02))",
                  boxShadow:
                    "0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 0 0 1px rgba(241, 236, 223, 0.05)",
                }}
              >
                <div
                  className="rounded-[calc(2rem-6px)] p-6 md:p-7 h-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(13, 21, 48, 0.6), rgba(5, 10, 26, 0.4))",
                  }}
                >
                  <h3 className="font-serif text-xl md:text-2xl text-atlas-cream font-light leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-loire-pale/75 leading-relaxed font-light">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Mode Nuit */}
        {!isNight && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 md:mt-16 flex justify-start"
          >
            <button
              type="button"
              onClick={toggle}
              className="group inline-flex items-center pl-5 pr-2 py-2 rounded-full border border-atlas-cream/35 hover:border-atlas-saffron text-atlas-cream hover:bg-loire-pale/5 transition-all duration-500 font-sans text-sm tracking-wide"
              style={{ transitionTimingFunction: "var(--ease-quintet)" }}
            >
              <span>Activer le mode nuit pour révéler les étoiles</span>
              <ArrowIcon size={32} variant="outline-light" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
