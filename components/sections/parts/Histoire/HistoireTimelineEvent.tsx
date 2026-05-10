"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { TimelineEvent } from "@/lib/data/timeline";

type Props = {
  event: TimelineEvent;
  index: number;
  isPivot: boolean;
};

/**
 * Sub-client de HistoireSection — un événement timeline.
 *
 * Hydraté seul : le reste de la section reste server. Anime à l'entrée :
 *  - opacity / y / blur de la <li> avec delay basé sur l'index
 *  - filet décoratif (scaleX) avec delay fixe
 *
 * Toute la mise en forme visuelle (markup, classes) est conservée à
 * l'identique de l'ancienne implémentation client.
 */
export function HistoireTimelineEvent({ event, index, isPivot }: Props) {
  const accentClasses =
    event.side === "loire"
      ? { text: "text-loire-deep", bg: "bg-loire-deep/60" }
      : event.side === "atlas"
        ? { text: "text-atlas-clay", bg: "bg-atlas-clay/60" }
        : { text: "text-atlas-ochre", bg: "bg-atlas-ochre/60" };

  return (
    <motion.li
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
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
          className={clsx("my-4 h-px w-12 origin-left", accentClasses.bg)}
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
}
