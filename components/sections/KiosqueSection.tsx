"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SandGrain } from "@/components/ui/SandGrain";
import { KIOSQUE_PARTNERS } from "@/lib/data/products";

export function KiosqueSection() {
  return (
    <SandGrain>
      <section
        id="kiosque"
        className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--color-atlas-saffron) 0%, var(--color-atlas-terracotta) 100%)",
        }}
      >
        {/* Soleil bas en filigrane */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-atlas-cream) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-loire-pale font-sans font-medium">
              Agadir · Gastronomie partagée
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-loire-pale mt-3 md:mt-4 leading-tight">
              Le <em className="italic text-atlas-cream">Kiosque</em> Solidaire
            </h2>
            <p className="mt-5 md:mt-6 text-base md:text-lg text-loire-pale/90 max-w-2xl mx-auto leading-relaxed">
              Une vitrine de la gastronomie orléanaise au cœur du Maroc. Les
              recettes, vinaigres et confiseries de la Loire rencontrent les
              produits du Souss-Massa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {KIOSQUE_PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-bridge-cream/95 backdrop-blur-sm rounded-2xl p-7 hover:scale-[1.02] transition-transform duration-500"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium">
                  {partner.city}
                </p>
                <h3 className="font-serif text-2xl text-bridge-ink mt-2 leading-tight">
                  {partner.name}
                </h3>
                <p className="text-sm italic text-atlas-clay font-sans mt-1">
                  {partner.craft}
                </p>
                <div className="mt-5 pt-5 border-t border-atlas-ochre/20">
                  <p className="text-sm text-bridge-ink/75 leading-relaxed">
                    {partner.contribution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SandGrain>
  );
}
