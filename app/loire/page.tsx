import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "La Loire — l'ancrage orléanais de l'Association Partage",
  description:
    "Pourquoi Orléans, pourquoi la Loire, pourquoi ce territoire est le port d'attache d'une association tournée vers le Maroc et le Sri Lanka. Géographie d'un engagement.",
  alternates: { canonical: `${SITE_URL}/loire` },
};

const REPERES = [
  {
    metric: "1 020 km",
    label: "Longueur du fleuve",
    text: "Le plus long fleuve de France — il prend sa source au Mont Gerbier-de-Jonc et se jette à Saint-Nazaire.",
  },
  {
    metric: "2015",
    label: "Année de fondation",
    text: "L'association nait sur les quais de Loire, autour d'une table d'amis et d'un projet pour le Sri Lanka.",
  },
  {
    metric: "280 km",
    label: "Patrimoine UNESCO",
    text: "Le Val de Loire entre Sully-sur-Loire et Chalonnes est classé patrimoine mondial depuis 2000.",
  },
  {
    metric: "13",
    label: "Bénévoles fondateurs",
    text: "Une équipe d'entrepreneurs, d'artisans et de cuisiniers orléanais — toujours actifs aujourd'hui.",
  },
];

const TERRITOIRE_PARTNERS = [
  {
    nom: "Vignobles de Loire",
    role: "Sommellerie partenaire",
    text: "Quincy, Sancerre, Vouvray, Chinon — les appellations du Val nourrissent les dîners caritatifs et les paniers donateurs.",
  },
  {
    nom: "Maraîchers orléanais",
    role: "Cuisines des événements",
    text: "Légumes anciens, fruits de saison, produits laitiers fermiers — collectés en circuit court pour chaque opération.",
  },
  {
    nom: "Artisans-bouchers du Loiret",
    role: "Partenaires du Kiosque",
    text: "Andouille de Jargeau, rillettes de Tours, terrines régionales — gastronomie ligérienne au service du Haut-Atlas.",
  },
];

export default function LoirePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="loire"
          eyebrow="Notre port d'attache"
          title={
            <>
              La <em className="italic text-atlas-saffron">Loire</em>
            </>
          }
          subtitle="Entre Orléans et le Val classé, le fleuve qui a vu naître notre association — et qui continue, chaque saison, de nourrir ses missions."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "La Loire" },
          ]}
        />

        {/* Bloc narratif d'ouverture */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              <strong className="text-bridge-ink">L'Association Partage est née à Orléans</strong>{" "}
              — pas par hasard. Cette ville sait ce qu'est tisser des liens entre rives,
              entre langues, entre cuisines. Le fleuve y a toujours été un trait
              d'union, jamais une frontière. Quand l'équipe fondatrice s'est rassemblée
              en 2015, c'est cette logique-là qu'elle a transposée : Orléans-Sri Lanka,
              puis Orléans-Haut-Atlas, comme on prolonge une berge.
            </p>

            <p>
              La Loire n'est pas un décor. C'est un{" "}
              <em>réseau économique</em> et une culture du soin de la matière. Nos
              partenaires viennent du tissu local : sommeliers, maraîchers, bouchers,
              vignerons. Quand le Kiosque Solidaire ouvre ses portes à Agadir, ce sont
              des cuisines orléanaises qui parlent. Quand un panier donateur arrive
              chez un mécène, il contient du Sancerre et du miel du Gâtinais.
            </p>

            <p>
              Cette page est une halte — pour comprendre comment un fleuve français
              irrigue, à 2 700 kilomètres de là, une vallée du Haut-Atlas.
            </p>
          </div>
        </article>

        {/* Repères chiffrés */}
        <section className="px-5 md:px-6 py-10 md:py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-loire-deep font-sans font-medium text-center">
              Repères
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-12 leading-tight">
              Le fleuve en{" "}
              <em className="italic text-loire-deep">quatre chiffres</em>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 py-8 border-t border-b border-loire-stone/40">
              {REPERES.map((r) => (
                <div key={r.label} className="text-center">
                  <div
                    className="font-serif text-4xl md:text-5xl font-extralight text-loire-deep leading-none"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {r.metric}
                  </div>
                  <div className="mt-2 text-[0.6rem] md:text-xs uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
                    {r.label}
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-bridge-ink/70 leading-relaxed font-light max-w-[28ch] mx-auto">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Citation manifeste */}
        <section className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-loire-deep font-sans font-medium mb-5">
              Pourquoi Orléans
            </p>
            <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-bridge-ink leading-[1.25] font-light">
              «&nbsp;On ne s'engage jamais hors de chez soi. On part toujours d'une
              rive,{" "}
              <em className="not-italic font-normal text-loire-deep">
                d'un endroit qui nous tient debout
              </em>
              . Pour nous, c'est la Loire. Le reste — l'Atlas, le Sri Lanka — c'est
              ce qu'elle nous permet d'atteindre.&nbsp;»
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
              <span className="w-8 h-px bg-loire-deep/40" />
              <span>Conseil d'administration · Assemblée générale 2024</span>
            </div>
          </div>
        </section>

        {/* Le tissu local */}
        <section className="px-5 md:px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
              Le tissu local
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-4 leading-tight">
              Les{" "}
              <em className="italic text-atlas-clay">artisans de la Loire</em> qui
              nous accompagnent
            </h2>
            <p className="max-w-2xl mx-auto text-center text-base md:text-lg text-bridge-ink/65 leading-relaxed mb-12 font-light">
              Aucune action humanitaire n'est neutre sur son territoire d'origine.
              Chacun de nos partenaires orléanais participe à une chaîne qui ne
              s'arrête pas à la Loire.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TERRITOIRE_PARTNERS.map((p) => (
                <li
                  key={p.nom}
                  className="rounded-2xl border border-loire-stone/60 bg-bridge-cream p-6 md:p-7"
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-loire-deep font-sans font-medium">
                    {p.role}
                  </p>
                  <h3 className="font-serif text-2xl text-bridge-ink mt-2 leading-tight">
                    {p.nom}
                  </h3>
                  <p className="mt-3 text-sm text-bridge-ink/70 leading-relaxed font-light">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA mécénat ligérien */}
        <section className="bg-bridge-ink py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-atlas-saffron font-sans font-medium">
              Mécènes du Loiret
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-loire-pale mt-4 leading-tight">
              Soutenir depuis{" "}
              <em className="italic text-atlas-saffron">la rive</em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-loire-pale/75 leading-relaxed font-light max-w-2xl mx-auto">
              60 % du don déductible des impôts. Réception personnalisée. Visite du
              centre Bledi pour les niveaux Or et Platinium.
            </p>
            <a
              href="/mecenat"
              className="inline-flex items-center gap-3 mt-8 px-7 py-3 rounded-full bg-atlas-saffron hover:bg-atlas-terracotta text-bridge-ink font-sans font-medium tracking-wide text-sm transition-all duration-500 shadow-md hover:shadow-lg"
            >
              Découvrir le mécénat
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/maroc",
              eyebrow: "L'autre rive",
              title: "Le Haut-Atlas",
              description:
                "Le territoire où la Loire prolonge ses missions — vallée, village et écosystème.",
            },
            {
              href: "/histoire",
              eyebrow: "Depuis 2015",
              title: "Notre histoire",
              description:
                "Comment quelques amis orléanais ont fait du fleuve un point de départ.",
            },
            {
              href: "/kiosque",
              eyebrow: "Le pont de table",
              title: "Le Kiosque Solidaire",
              description:
                "Quand la cuisine du Val de Loire dialogue avec celle d'Agadir.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
