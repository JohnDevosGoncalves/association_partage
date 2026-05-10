"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
};

/**
 * Champ d'étoiles plein écran — uniquement actif en mode nuit.
 *
 * Optimisations perf :
 *  - Le canvas n'est PAS monté en mode jour (early return) — économise la
 *    boucle requestAnimationFrame qui sinon tourne à 60fps en permanence.
 *  - Quand le mode nuit s'active, le canvas se monte avec un fade-in CSS.
 */
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isNight = theme === "night";

  useEffect(() => {
    if (!isNight) return; // pas de boucle RAF en mode jour
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const count = Math.floor(
        (window.innerWidth * window.innerHeight) / 9000,
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        const tw = 0.5 + 0.5 * Math.sin(t / 1000 / star.speed + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 233, 160, ${0.3 + tw * 0.7})`;
        ctx.fill();

        if (star.r > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 233, 160, ${tw * 0.08})`;
          ctx.fill();
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isNight]);

  // Pas de canvas du tout en mode jour — pas de coût DOM/GPU
  if (!isNight) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 motion-safe:animate-[fadein_1s_ease-out]"
    />
  );
}
