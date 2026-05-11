import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import {
  EXTENDED_PARTNERS,
  CATEGORY_LABELS,
  CATEGORY_INTROS,
  groupPartnersByCategory,
  type PartnerCategory,
} from "@/lib/data/partners-extended";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nos partenaires — l'écosystème de l'Association Partage",
  description:
    "Les 16 partenaires de l'Association Partage : artisans du Kiosque, gastronomie ligérienne, services aux professionnels, énergie, sport, image. Chacun joue un rôle concret dans nos missions Orléans-Haut-Atlas.",
  alternates: { canonical: `${SITE_URL}/partenaires` },
};

const CATEGORY_ORDER: PartnerCategory[] = [
  "kiosque",
  "gastronomie",
  "services-pros",
  "energie-mobilite",
  "loisirs-sport",
  "communication",
];

export default function PartenairesPage() {
  const grouped = groupPartnersByCategory();

  // JSON-LD : liste structurée des partenaires (Organization → memberOf)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/partenaires`,
    name: "Partenaires · Association Partage",
    description:
      "Les partenaires de l'Association Partage répartis en six catégories : Kiosque, gastronomie, services, énergie, sport, image.",
    url: `${SITE_URL}/partenaires`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: EXTENDED_PARTNERS.length,
      itemListElement: EXTENDED_PARTNERS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Organization",
          name: p.name,
          url: p.website,
          description: p.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: p.city,
            addressCountry: "FR",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="bridge"
          eyebrow="Notre écosystème"
          title={
            <>
              Nos <em className="italic text-atlas-saffron">partenaires</em>
            </>
          }
          subtitle="Aucune association ne tient seule. Voici les 16 structures et artisans qui rendent possibles, chaque jour, les missions de l'Association Partage — d'Orléans au Haut-Atlas."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Partenaires" },
          ]}
        />

        {/* Intro éditoriale */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              Cette page rassemble{" "}
              <strong className="text-bridge-ink">
                l'ensemble des partenaires institutionnels, artisanaux et
                bénévoles
              </strong>{" "}
              qui accompagnent l'association sur la durée. Certains sont des
              grands noms de la gastronomie ligérienne — Christophe Hay,
              Martin-Pouret, Duralex. D'autres sont des structures locales
              moins exposées mais tout aussi indispensables : assurance,
              énergie, communication, sport.
            </p>
            <p>
              Chacun joue un rôle <em>identifiable</em>. Aucun de ces
              partenariats n'est de complaisance : nous les valorisons ici
              parce qu'ils <strong>nous valorisent en retour</strong>, par leur
              compétence et leur engagement.
            </p>
          </div>
        </article>

        {/* Catégories successives */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-10 md:pb-16">
          {CATEGORY_ORDER.map((cat) => {
            const partners = grouped[cat];
            if (partners.length === 0) return null;

            return (
              <div
                key={cat}
                id={cat}
                className="mt-12 md:mt-20 first:mt-0 scroll-mt-24"
              >
                {/* En-tête de catégorie */}
                <header className="mb-8 md:mb-10 max-w-2xl">
                  <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium">
                    {String(CATEGORY_ORDER.indexOf(cat) + 1).padStart(2, "0")} ·{" "}
                    Catégorie
                  </p>
                  <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink mt-3 leading-[1.05] font-light tracking-tight">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <p className="mt-4 text-base md:text-lg text-bridge-ink/65 leading-relaxed font-light max-w-[60ch]">
                    {CATEGORY_INTROS[cat]}
                  </p>
                </header>

                {/* Liste des partenaires de la catégorie */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {partners.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full rounded-2xl border border-loire-stone/50 bg-bridge-cream hover:border-atlas-clay/50 hover:shadow-lg transition-all duration-500 p-6 md:p-7"
                      >
                        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-atlas-clay font-sans font-medium">
                          {p.role}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl text-bridge-ink mt-2 leading-tight group-hover:text-atlas-clay transition-colors duration-500">
                          {p.name}
                        </h3>
                        <p className="text-xs text-bridge-ink/55 font-sans mt-1">
                          {p.city}
                        </p>
                        <p className="mt-4 text-sm md:text-base text-bridge-ink/75 leading-relaxed font-light">
                          {p.description}
                        </p>
                        <span className="inline-flex items-baseline gap-2 mt-5 text-[0.7rem] uppercase tracking-[0.25em] text-atlas-clay font-sans font-medium group-hover:gap-3 transition-all duration-500">
                          Visiter le site
                          <span aria-hidden="true">↗</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* CTA devenir partenaire */}
        <section className="bg-bridge-ink py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-atlas-saffron font-sans font-medium">
              Rejoindre l'écosystème
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-loire-pale mt-4 leading-tight">
              Devenir{" "}
              <em className="italic text-atlas-saffron">partenaire</em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-loire-pale/75 leading-relaxed font-light max-w-2xl mx-auto">
              Vous portez une structure ligérienne et l'engagement de
              l'association résonne avec vos valeurs ? Le bureau étudie
              chaque proposition — mécénat numéraire, en nature, ou en
              compétences.
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
              href: "/kiosque",
              eyebrow: "Le comptoir",
              title: "Le Kiosque Solidaire",
              description:
                "Le lieu d'Agadir où les artisans orléanais s'invitent à table autour de la cuisine du Souss-Massa.",
            },
            {
              href: "/blog/portraits-artisans-kiosque-orleans-hay-papion-pouret-duralex",
              eyebrow: "Article de fond",
              title: "Portraits des artisans du Kiosque",
              description:
                "Hay, Papion, Pouret, Duralex — un à un, qui ils sont et ce qu'ils apportent.",
            },
            {
              href: "/mecenat",
              eyebrow: "Rejoindre",
              title: "Devenir mécène",
              description:
                "Quatre niveaux d'engagement, déduction fiscale 60 %, impact mesurable.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
