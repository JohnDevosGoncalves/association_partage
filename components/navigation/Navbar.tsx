"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { BrandLogo } from "@/components/ui/BrandLogo";

// Liens absolus avec ancre — fonctionnent depuis n'importe quelle page
// (sur la home, scrollent à l'ancre ; depuis /histoire, retournent à home + scrollent).
const NAV_LINKS = [
  { href: "/#histoire", label: "Histoire" },
  { href: "/#pont", label: "Le Pont" },
  { href: "/#bledi", label: "Maison Bledi" },
  { href: "/#astronomie", label: "Astronomie" },
  { href: "/#cooperative", label: "Coopérative" },
  { href: "/#kiosque", label: "Kiosque" },
  { href: "/#mecenat", label: "Mécénat" },
];

// Pages dédiées — groupe séparé dans le drawer mobile
const TERRITOIRES_LINKS = [
  { href: "/loire", label: "La Loire" },
  { href: "/maroc", label: "Le Maroc" },
  { href: "/partenaires", label: "Les partenaires" },
  { href: "/blog", label: "Le blog" },
];

// Liens directs ajoutés côté desktop (rendus en parallèle des NAV_LINKS ancrés)
const DESKTOP_PAGE_LINKS = [
  { href: "/partenaires", label: "Partenaires" },
  { href: "/blog", label: "Blog" },
];

const DESKTOP_LINKS = [
  ...NAV_LINKS.filter((l) =>
    ["/#histoire", "/#bledi", "/#cooperative", "/#kiosque", "/#mecenat"].includes(
      l.href,
    ),
  ),
  ...DESKTOP_PAGE_LINKS,
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le drawer si la fenêtre devient assez large pour le menu desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Empêche le scroll de la page quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bridge-cream/90 backdrop-blur-md border-b border-loire-stone/60 py-3"
            : "bg-transparent border-b border-transparent py-4 md:py-5",
        )}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between gap-3">
          <a
            href="/"
            className="flex items-center gap-3 transition-opacity duration-500 hover:opacity-80"
            aria-label="Association Partage — Retour à l'accueil"
          >
            <BrandLogo size={scrolled ? 36 : 42} variant="mark" />
            <span className="hidden md:inline-block font-serif italic text-base md:text-lg tracking-wide text-bridge-ink whitespace-nowrap">
              Association <span className="text-atlas-saffron">Partage</span>
            </span>
          </a>

          {/* Liens desktop (lg+) — 7 entrées, masquées en dessous de lg pour rester lisibles */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
            {DESKTOP_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={clsx(
                    "text-[0.7rem] xl:text-xs uppercase tracking-[0.18em] xl:tracking-[0.2em] font-sans transition-colors whitespace-nowrap",
                    "text-bridge-ink/75 hover:text-atlas-saffron",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Bouton "Soutenir" — visible desktop seulement */}
            <a
              href="/mecenat"
              className="hidden sm:inline-flex px-4 md:px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all whitespace-nowrap bg-atlas-saffron hover:bg-atlas-terracotta text-bridge-cream shadow-sm hover:shadow"
            >
              Soutenir
            </a>

            {/* Hamburger — visible jusqu'à lg (le menu desktop apparaît à partir de lg) */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-colors border border-bridge-ink/25 text-bridge-ink hover:border-atlas-saffron hover:text-atlas-saffron"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-bridge-ink/70 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-[82%] max-w-sm bg-bridge-cream shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-label="Menu de navigation"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-loire-stone/50">
                <span className="font-serif italic text-lg text-bridge-ink">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-bridge-ink/20 hover:border-atlas-clay text-bridge-ink"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6l-12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul>
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-4 font-serif text-2xl text-bridge-ink hover:text-atlas-clay border-b border-loire-stone/40 transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Groupe Territoires */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-8 mb-2 text-[0.6rem] uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium"
                >
                  Territoires
                </motion.p>
                <ul>
                  {TERRITOIRES_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 font-serif italic text-xl text-bridge-ink/85 hover:text-atlas-saffron border-b border-loire-stone/40 transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-loire-stone/50 bg-loire-pale/40">
                <a
                  href="/mecenat"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-sans font-medium bg-atlas-saffron text-bridge-ink hover:bg-atlas-cream transition-colors"
                >
                  Soutenir l'association
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
