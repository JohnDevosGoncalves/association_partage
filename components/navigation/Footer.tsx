import Link from "next/link";

const NAV_PAGES = [
  { href: "/histoire", label: "Notre histoire" },
  { href: "/maison-bledi", label: "La Maison Bledi" },
  { href: "/loire", label: "La Loire" },
  { href: "/maroc", label: "Le Maroc" },
  { href: "/cooperative", label: "La Coopérative" },
  { href: "/kiosque", label: "Le Kiosque" },
  { href: "/mecenat", label: "Devenir mécène" },
  { href: "/blog", label: "Le blog" },
];

export function Footer() {
  return (
    <footer
      id="infos-legales"
      className="relative text-loire-pale py-16 md:py-20 px-5 md:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--color-loire-deep) 0%, var(--color-bridge-ink) 50%, var(--color-atlas-clay) 100%)",
      }}
    >
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Colonne 1 — Brand */}
        <div>
          <p className="font-serif italic text-2xl">
            Association <span className="text-atlas-saffron">Partage</span>
          </p>
          <p className="mt-3 text-sm text-loire-pale/75 leading-relaxed">
            Un pont solidaire d'Orléans au Haut-Atlas. Reconnue d'intérêt général
            depuis 2015.
          </p>
        </div>

        {/* Colonne 2 — Pages */}
        <nav aria-label="Pages du site">
          <p className="text-xs uppercase tracking-[0.3em] text-atlas-cream mb-4 font-sans">
            Explorer
          </p>
          <ul className="space-y-2 text-sm text-loire-pale/85">
            {NAV_PAGES.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="hover:text-atlas-saffron transition-colors duration-300"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Colonne 3 — Contact France */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-atlas-cream mb-4 font-sans">
            Contact France
          </p>
          <address className="not-italic text-sm space-y-1 text-loire-pale/85">
            <div>Siège — Orléans</div>
            <div>contact@association-partage.fr</div>
            <div>+33 (0)2 38 00 00 00</div>
          </address>
        </div>

        {/* Colonne 4 — Contact Maroc */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-atlas-cream mb-4 font-sans">
            Contact Maroc
          </p>
          <address className="not-italic text-sm space-y-1 text-loire-pale/85">
            <div>Maison Bledi — Haut-Atlas</div>
            <div>Kiosque Solidaire — Agadir</div>
            <div>maroc@association-partage.fr</div>
          </address>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto mt-16 pt-8 border-t border-loire-pale/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-loire-pale/60 font-sans">
        <p>© {new Date().getFullYear()} Association Partage — Tous droits réservés</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-atlas-cream transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-atlas-cream transition-colors">Politique RGPD</a>
        </div>
      </div>
    </footer>
  );
}
