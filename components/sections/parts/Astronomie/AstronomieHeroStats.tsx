"use client";

import { motion } from "framer-motion";

type Stat = { value: string; suffix: string; label: string };

type Props = {
  stats: Stat[];
};

/**
 * Sub-client de AstronomieSection — la grande tile stats (col-span-7).
 *
 * Réception de `stats` depuis le parent server. Les seules raisons d'être
 * client : motion.div initial/whileInView (révélation au scroll).
 */
export function AstronomieHeroStats({ stats }: Props) {
  return (
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
              <div className="font-serif text-[5rem] md:text-[7rem] lg:text-[9rem] font-extralight text-atlas-saffron leading-[0.85] tabular">
                300
              </div>
              <div className="mt-2 text-sm md:text-base uppercase tracking-[0.25em] text-loire-pale/70 font-sans">
                jours de soleil par an
              </div>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-5 pt-6 border-t border-loire-pale/15">
              {stats.slice(1).map((s) => (
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
  );
}
