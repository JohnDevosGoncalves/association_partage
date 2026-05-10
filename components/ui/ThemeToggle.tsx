"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import clsx from "clsx";

type ThemeToggleProps = {
  variant?: "light" | "dark"; // adapte la couleur du bouton selon le fond
};

export function ThemeToggle({ variant = "light" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isNight
          ? "Désactiver le mode nuit astronomie"
          : "Activer le mode nuit astronomie"
      }
      aria-pressed={isNight}
      className={clsx(
        "relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500",
        "border backdrop-blur-sm overflow-hidden",
        variant === "light" || isNight
          ? "border-loire-pale/40 hover:border-atlas-cream text-loire-pale"
          : "border-bridge-ink/30 hover:border-atlas-clay text-bridge-ink"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isNight ? (
          // Étoile à 5 branches — mode nuit actif (observation Unistellar)
          <motion.svg
            key="star"
            initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5 }}
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2l2.39 7.36H22l-6.31 4.58L18.08 21 12 16.42 5.92 21l2.39-7.06L2 9.36h7.61z" />
          </motion.svg>
        ) : (
          // Télescope — mode jour, invitation à observer la nuit
          <motion.svg
            key="telescope"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Tube du télescope incliné */}
            <path d="M3 14l8 -3" />
            <path d="M5 18l8 -3" />
            <path d="M3 14l2 4" />
            <path d="M11 11l2 4" />
            {/* Objectif */}
            <circle cx="17.5" cy="9.5" r="2.5" />
            {/* Trépied */}
            <path d="M12 14l1 6" />
            <path d="M9 20h7" />
            {/* Étoile observée */}
            <path d="M21 4l.4 1.2L22.5 6l-1.1 .8L21 8l-.4-1.2L19.5 6l1.1 -.8z" fill="currentColor" stroke="none" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
