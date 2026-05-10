"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SandGrain } from "@/components/ui/SandGrain";
import { COOPERATIVE_PRODUCTS } from "@/lib/data/products";

export function CooperativeSection() {
  return (
    <section
      id="cooperative"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden"
      style={{ background: "var(--color-bridge-cream)" }}
    >
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-ochre font-sans font-medium">
            Production locale et bio
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            La <em className="italic text-atlas-clay">Coopérative</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
            Savonnerie artisanale et huiles vierges produites par les femmes du
            village. Chaque achat finance directement leur autonomie économique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {COOPERATIVE_PRODUCTS.map((product, i) => {
            const isSavon = product.category === "savon";
            return (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <SandGrain
                  className="rounded-2xl overflow-hidden border border-atlas-ochre/20 hover:border-atlas-clay/45 transition-all duration-500 h-full"
                  style={{
                    background: isSavon
                      ? "linear-gradient(180deg, #f4e4c1 0%, #e8d6a8 100%)"
                      : "linear-gradient(180deg, #d4a843 0%, #b5824a 100%)",
                  }}
                >
                  <div className="relative aspect-square flex items-center justify-center">
                    <span className="font-serif text-7xl" style={{
                      color: isSavon ? "#8b3a2a" : "#f4e4c1",
                    }}>
                      {isSavon ? "♥" : "❋"}
                    </span>
                  </div>
                  <div className="bg-bridge-cream p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-atlas-ochre font-sans font-medium">
                      {product.origin}
                    </p>
                    <h3 className="font-serif text-xl text-bridge-ink mt-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm text-bridge-ink/70 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </SandGrain>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
