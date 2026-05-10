"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowIcon } from "@/components/ui/IconButton";

/**
 * Sub-client du Hero — CTAs avec MagneticButton + reveal.
 * Isolé pour ne pas faire bouger les imports framer-motion + magnetic au server.
 */
export function HeroCTAs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.1, ease: [0.32, 0.72, 0, 1] }}
      className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4"
    >
      <MagneticButton
        href="/mecenat"
        strength={0.3}
        className="group relative inline-flex items-center justify-between px-2 py-2 pl-7 bg-bridge-ink hover:bg-atlas-clay text-bridge-cream font-sans font-medium tracking-[-0.01em] text-sm md:text-base rounded-full active:scale-[0.98] transition-[background-color,transform] duration-500"
      >
        <span className="relative z-10">Soutenir notre mission</span>
        <ArrowIcon size={36} variant="ghost" />
      </MagneticButton>

      <Link
        href="/histoire"
        className="group inline-flex items-center px-7 py-3.5 text-bridge-ink hover:text-atlas-clay font-sans font-medium tracking-[-0.01em] text-sm md:text-base transition-colors duration-500"
      >
        <span className="border-b border-bridge-ink/30 group-hover:border-atlas-clay/60 pb-0.5 transition-colors duration-500">
          Notre histoire
        </span>
        <span
          aria-hidden="true"
          className="ml-2 transition-transform duration-500 group-hover:translate-x-1"
          style={{ transitionTimingFunction: "var(--ease-quintet)" }}
        >
          ↗
        </span>
      </Link>
    </motion.div>
  );
}
