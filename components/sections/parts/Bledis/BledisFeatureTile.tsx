"use client";

import { motion } from "framer-motion";

export type BledisFeature = {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  size: "hero" | "wide" | "compact";
  variant: "loire" | "atlas";
};

const sizeToColSpan = {
  hero: "md:col-span-12 lg:col-span-7 lg:row-span-2",
  wide: "md:col-span-6 lg:col-span-5",
  compact: "md:col-span-6 lg:col-span-3",
} as const;

type Props = {
  feature: BledisFeature;
  index: number;
};

/**
 * Sub-client de BledisSection — une tile du bento.
 *
 * Hydraté seul : la tile <motion.article> reçoit un index pour staggerer
 * son entrée (delay = i * 0.08). Le filet décoratif animé n'apparaît que
 * pour la tile hero.
 */
export function BledisFeatureTile({ feature, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
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
  );
}
