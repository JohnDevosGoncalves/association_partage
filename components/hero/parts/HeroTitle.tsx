"use client";

import { WordReveal } from "@/components/ui/WordReveal";

/**
 * Sub-client du Hero — uniquement la révélation cinétique du H1.
 * Isolé pour que la balise h1 elle-même reste server (sémantique).
 */
export function HeroTitle() {
  return (
    <h1
      className="font-serif font-light text-bridge-ink leading-[0.92] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] tracking-[-0.02em]"
      style={{ textWrap: "balance" }}
    >
      <WordReveal
        text="Entre Terre"
        duration={1.0}
        staggerChildren={0.18}
        delayChildren={0.4}
        emphasis={{ Terre: "italic font-extralight text-atlas-saffron" }}
      />
      <br />
      <WordReveal
        text="et Loire"
        duration={1.0}
        staggerChildren={0.18}
        delayChildren={0.95}
        emphasis={{ Loire: "italic font-extralight text-loire-mist" }}
      />
    </h1>
  );
}
