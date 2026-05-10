"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/lib/data/timeline";
import { fadeInUp } from "@/lib/animations";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import clsx from "clsx";

/**
 * Histoire — timeline éditoriale, left-aligned (anti-center bias).
 *
 * Refonte (taste-skill + soft-skill) :
 *  - En-tête asymétrique split (eyebrow + H2 gauche, intro droite)
 *  - Timeline avec rail vertical à gauche, événements en cards textuelles
 *  - Année en typographie display extralight
 *  - Custom cubic-bezier pour reveal
 *  - Tabular-nums sur les années
 *  - Hiérarchie : événement pivot 2015 et 2021 en TAILLE LARGER
 */
export function HistoireSection() {
  // Indice des événements pivots (qui méritent un poids visuel supplémentaire)
  const PIVOT_INDICES = new Set([0, 2]); // 2015 fondation, 2021 Maison Bledi

  return (
    <section
      id="histoire"
      className="relative py-24 md:py-32 lg:py-40 px-5 md:px-8 lg:px-12 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* Header en split asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-7"
          >
            <EyebrowBadge variant="loire" className="mb-5">
              Le voyage commence en 2015
            </EyebrowBadge>
            <h2 className="font-serif font-light text-bridge-ink leading-[0.95] text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em]">
              Une{" "}
              <em className="italic font-extralight text-atlas-clay">
                histoire
              </em>{" "}
              de partage
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5 lg:pt-10 text-base md:text-lg text-bridge-ink/70 max-w-[55ch] leading-[1.6] font-light"
          >
            Tout commence à Orléans, au bord de la Loire, par un geste simple :
            offrir à des enfants l'accès à l'école. Dix ans plus tard, ce geste
            est devenu un pont entre la France, le Sri Lanka et le Maroc.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-16 md:gap-y-24">
          {/* Rail vertical à gauche sur desktop */}
          <div
            className="hidden lg:block lg:col-span-3 lg:row-span-full relative"
            aria-hidden="true"
          >
            <div className="sticky top-32 h-[500px] flex items-start justify-center">
              <div
                className="w-px h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--color-loire-deep) 0%, var(--color-loire-stream) 30%, var(--color-atlas-ochre) 60%, var(--color-atlas-saffron) 100%)",
                }}
              />
            </div>
          </div>

          {/* Liste événements */}
          <ol className="lg:col-span-9 space-y-16 md:space-y-24">
            {TIMELINE.map((event, i) => {
              const isPivot = PIVOT_INDICES.has(i);
              const accentClasses =
                event.side === "loire"
                  ? { text: "text-loire-deep", bg: "bg-loire-deep/60" }
                  : event.side === "atlas"
                    ? { text: "text-atlas-clay", bg: "bg-atlas-clay/60" }
                    : { text: "text-atlas-ochre", bg: "bg-atlas-ochre/60" };
              return (
                <motion.li
                  key={event.year}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 items-baseline"
                >
                  {/* Année */}
                  <div className="md:col-span-3">
                    <div
                      className={clsx(
                        "font-serif font-extralight leading-none tabular",
                        isPivot
                          ? `text-7xl md:text-8xl ${accentClasses.text}`
                          : `text-5xl md:text-6xl text-bridge-ink/35`,
                      )}
                    >
                      {event.year}
                    </div>
                    {isPivot && (
                      <div className="mt-3 text-[0.55rem] uppercase tracking-[0.3em] text-bridge-ink/45 font-sans">
                        ✦ Moment pivot
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="md:col-span-9 max-w-[60ch]">
                    <h3
                      className={clsx(
                        "font-serif text-bridge-ink leading-tight",
                        isPivot
                          ? "text-2xl md:text-4xl font-light"
                          : "text-xl md:text-2xl font-normal",
                      )}
                      style={{ textWrap: "balance" }}
                    >
                      {event.title}
                    </h3>

                    {/* Filet décoratif */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                      className={clsx(
                        "my-4 h-px w-12 origin-left",
                        accentClasses.bg,
                      )}
                    />

                    <p
                      className={clsx(
                        "text-bridge-ink/70 leading-[1.6] font-light",
                        isPivot ? "text-base md:text-lg" : "text-sm md:text-base",
                      )}
                      style={{ textWrap: "pretty" }}
                    >
                      {event.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
