"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { MecenatTable } from "@/components/ui/MecenatTable";
import { ColombelCard } from "@/components/parrains/ColombelCard";

export function MecenatSection() {
  return (
    <section
      id="mecenat"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden bg-bridge-cream"
    >
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-clay font-sans font-medium">
            Engagez-vous à nos côtés
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            Devenir <em className="italic text-atlas-clay">mécène</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
            Quatre niveaux d'engagement, quatre impacts concrets. Survolez un
            niveau pour découvrir ce que votre soutien rend possible.
          </p>
        </motion.div>

        <MecenatTable />

        <div className="mt-16 md:mt-24">
          <ColombelCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 md:mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-bridge-ink hover:bg-atlas-clay text-bridge-cream font-sans font-medium tracking-wide rounded-full transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Construisons ensemble
            <span className="ml-3">→</span>
          </a>
          <p className="mt-4 text-sm text-bridge-ink/60 italic">
            Toutes nos conventions de mécénat ouvrent droit à 60 % de réduction d'impôt.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
