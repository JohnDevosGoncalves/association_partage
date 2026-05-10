"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type ImpactCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

/**
 * Compteur animé qui démarre quand le composant entre dans le viewport.
 * Easing easeOut pour un effet "qui freine" en arrivant à la valeur finale.
 */
export function ImpactCounter({
  value,
  suffix = "",
  label,
  duration = 2,
}: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <div className="font-serif text-5xl md:text-6xl font-light text-atlas-clay">
        {display.toLocaleString("fr-FR")}
        <span className="text-atlas-saffron">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-bridge-ink/70 font-sans">{label}</p>
    </motion.div>
  );
}
