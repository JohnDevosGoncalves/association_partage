import dynamic from "next/dynamic";
import { Reveal } from "@/components/interactive/Reveal";

// Lazy-load — le formulaire (state form + AnimatePresence + react-hook
// patterns) n'est pas chargé tant que le user n'arrive pas en bas de page.
const ContactForm = dynamic(
  () => import("@/components/ui/ContactForm").then((mod) => mod.ContactForm),
  {
    loading: () => (
      <div className="space-y-4" aria-hidden="true">
        <div className="h-12 bg-loire-pale/40 rounded-lg animate-pulse" />
        <div className="h-12 bg-loire-pale/40 rounded-lg animate-pulse" />
        <div className="h-32 bg-loire-pale/40 rounded-lg animate-pulse" />
      </div>
    ),
  },
);

/**
 * Section "Écrivez-nous" — Server Component.
 *
 * Le wrapper, le filigrane SVG, l'eyebrow + titre + intro et les deux cartes
 * de coordonnées sont du JSX statique. Seul <ContactForm> est un leaf client.
 * Les animations d'entrée passent par <Reveal>.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-28 px-5 md:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bridge-cream) 0%, var(--color-loire-pale) 100%)",
      }}
    >
      {/* Filigrane discret — vagues Loire */}
      <svg
        className="absolute -bottom-10 left-0 w-full opacity-[0.05] pointer-events-none"
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,100 Q200,60 400,100 T800,100 L800,200 L0,200 Z"
          fill="var(--color-loire-deep)"
        />
      </svg>

      <div className="relative max-w-4xl mx-auto">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-loire-deep font-sans font-medium">
            Construisons ensemble
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bridge-ink mt-3 md:mt-4 leading-tight">
            Écrivez-<em className="italic text-atlas-clay">nous</em>
          </h2>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed">
            Mécénat, bénévolat, visite de la Maison Bledi, demande presse —
            chaque message est lu personnellement par notre bureau orléanais.
          </p>
        </Reveal>

        <Reveal
          delay={0.2}
          y={20}
          duration={0.7}
          noBlur
          className="bg-bridge-cream/95 backdrop-blur-sm rounded-2xl border border-loire-stone/60 p-6 md:p-10 shadow-lg"
        >
          <ContactForm />
        </Reveal>

        <Reveal
          delay={0.4}
          y={0}
          duration={0.7}
          noBlur
          className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm"
        >
          <div className="rounded-xl border border-loire-stone/60 bg-bridge-cream/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-loire-deep font-sans font-medium">
              France · Orléans
            </p>
            <p className="font-serif text-lg text-bridge-ink mt-1">
              Siège de l'association
            </p>
            <a
              href="mailto:contact@association-partage.fr"
              className="block mt-2 text-bridge-ink/80 hover:text-atlas-clay transition-colors"
            >
              contact@association-partage.fr
            </a>
            <p className="text-bridge-ink/70">+33 (0)2 38 00 00 00</p>
          </div>
          <div className="rounded-xl border border-atlas-ochre/40 bg-bridge-cream/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium">
              Maroc · Haut-Atlas & Agadir
            </p>
            <p className="font-serif text-lg text-bridge-ink mt-1">
              Maison Bledi & Kiosque
            </p>
            <a
              href="mailto:maroc@association-partage.fr"
              className="block mt-2 text-bridge-ink/80 hover:text-atlas-clay transition-colors"
            >
              maroc@association-partage.fr
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
