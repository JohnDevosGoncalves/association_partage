"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTheme } from "@/lib/ThemeContext";

/**
 * Section dédiée au partenariat Unistellar — observation astronomique
 * depuis le Haut-Atlas (300 jours de soleil, ciel pur).
 * S'intensifie visuellement quand le mode nuit est activé.
 */
export function AstronomieSection() {
  const { theme, toggle } = useTheme();
  const isNight = theme === "night";

  return (
    <section
      id="astronomie"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden transition-colors duration-1000"
      style={{
        background: isNight
          ? "linear-gradient(180deg, var(--color-night-deep) 0%, #0d1530 100%)"
          : "linear-gradient(180deg, var(--color-loire-deep) 0%, #0d1c33 100%)",
      }}
    >
      {/* Constellations — révélées principalement en mode nuit */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: isNight ? 1 : 0.3 }}
        aria-hidden="true"
      >
        {/* Grande Ourse stylisée */}
        <g stroke="var(--color-night-star)" strokeWidth="1" fill="var(--color-night-star)">
          <line x1="120" y1="80" x2="160" y2="100" strokeOpacity="0.5" />
          <line x1="160" y1="100" x2="200" y2="90" strokeOpacity="0.5" />
          <line x1="200" y1="90" x2="240" y2="110" strokeOpacity="0.5" />
          <line x1="240" y1="110" x2="270" y2="140" strokeOpacity="0.5" />
          <line x1="270" y1="140" x2="220" y2="160" strokeOpacity="0.5" />
          <line x1="220" y1="160" x2="240" y2="110" strokeOpacity="0.5" />
          {[
            [120, 80],
            [160, 100],
            [200, 90],
            [240, 110],
            [270, 140],
            [220, 160],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" className="star-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </g>
        {/* Orion stylisée */}
        <g stroke="var(--color-night-star)" strokeWidth="1" fill="var(--color-night-star)">
          <line x1="560" y1="100" x2="600" y2="150" strokeOpacity="0.5" />
          <line x1="600" y1="150" x2="640" y2="100" strokeOpacity="0.5" />
          <line x1="580" y1="200" x2="620" y2="200" strokeOpacity="0.5" />
          <line x1="620" y1="200" x2="660" y2="200" strokeOpacity="0.5" />
          <line x1="600" y1="150" x2="600" y2="270" strokeOpacity="0.5" />
          {[
            [560, 100],
            [600, 150],
            [640, 100],
            [580, 200],
            [620, 200],
            [660, 200],
            [600, 270],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" className="star-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </g>
      </svg>

      <div className="relative max-w-4xl mx-auto text-loire-pale">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-atlas-cream font-sans font-medium">
            Partenariat Unistellar
          </p>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 md:mt-4 leading-tight">
            Le ciel du <em className="italic text-atlas-saffron">Haut-Atlas</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-loire-pale/85 leading-relaxed max-w-2xl mx-auto">
            300 jours de soleil par an, et autant de nuits limpides. La Maison
            Bledi accueille un télescope connecté Unistellar — chaque enfant
            du village peut désormais observer Saturne, la Lune, les amas
            d'étoiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {[
            {
              title: "Observation citoyenne",
              text: "Les données collectées contribuent à des programmes scientifiques internationaux.",
            },
            {
              title: "Pédagogie locale",
              text: "Ateliers d'astronomie pour les enfants des villages voisins, en arabe et berbère.",
            },
            {
              title: "Tourisme solidaire",
              text: "Soirées d'observation ouvertes aux mécènes et bénévoles en visite.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="rounded-2xl p-6 border border-loire-pale/15 bg-loire-pale/5 backdrop-blur-sm"
            >
              <h3 className="font-serif text-xl text-atlas-cream">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-loire-pale/85 leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Invitation à activer le mode nuit, seulement si désactivé */}
        {!isNight && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 text-center"
          >
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-atlas-cream/40 hover:border-atlas-saffron text-atlas-cream hover:bg-loire-pale/5 transition-all font-sans text-sm tracking-wide"
            >
              <span className="text-lg">✦</span>
              Activer le mode nuit pour révéler les étoiles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
