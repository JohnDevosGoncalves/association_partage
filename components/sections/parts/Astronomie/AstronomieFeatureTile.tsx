"use client";

import { motion } from "framer-motion";

type Feature = {
  title: string;
  text: string;
  icon: string;
};

type Props = {
  card: Feature;
  index: number;
};

/**
 * Sub-client de AstronomieSection — une tile satellite du bento.
 *
 * Animation fade-up + blur staggered (delay = 0.15 + i * 0.1).
 */
export function AstronomieFeatureTile({ card, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.9,
        delay: 0.15 + index * 0.1,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="md:col-span-4 lg:col-span-5"
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
  );
}
