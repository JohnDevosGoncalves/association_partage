"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { ArrowIcon } from "@/components/ui/IconButton";

/**
 * Sub-client de AstronomieSection — bouton "Activer le mode nuit".
 *
 * Apparaît uniquement quand theme === "day". Le clic appelle toggle() du
 * ThemeContext qui bascule <html data-theme="night">.
 */
export function AstronomieToggle() {
  const { theme, toggle } = useTheme();
  if (theme === "night") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-12 md:mt-16 flex justify-start"
    >
      <button
        type="button"
        onClick={toggle}
        className="group inline-flex items-center pl-5 pr-2 py-2 rounded-full border border-atlas-cream/35 hover:border-atlas-saffron text-atlas-cream hover:bg-loire-pale/5 transition-all duration-500 font-sans text-sm tracking-wide"
        style={{ transitionTimingFunction: "var(--ease-quintet)" }}
      >
        <span>Activer le mode nuit pour révéler les étoiles</span>
        <ArrowIcon size={32} variant="outline-light" />
      </button>
    </motion.div>
  );
}
