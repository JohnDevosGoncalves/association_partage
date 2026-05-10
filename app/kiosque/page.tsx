import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { KiosqueSection } from "@/components/sections/KiosqueSection";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le Kiosque Solidaire — gastronomie orléanaise à Agadir",
  description:
    "Vitrine de la gastronomie d'Orléans à Agadir, en partenariat avec Christophe Hay, Martin-Pouret (1797) et Sébastien Papion. Pont gourmand France-Maroc.",
  alternates: { canonical: `${SITE_URL}/kiosque` },
};

export default function KiosquePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="atlas"
          eyebrow="Agadir · Gastronomie partagée"
          title={
            <>
              Le <em className="italic text-atlas-cream">Kiosque</em> Solidaire
            </>
          }
          subtitle="Une vitrine où les recettes du Val de Loire rencontrent les produits du Souss-Massa. Chaque assiette finance la mission au Haut-Atlas."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Kiosque Solidaire" },
          ]}
        />

        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              Le Kiosque est une idée qui a mis du temps à mûrir. Comment faire
              connaître la mission marocaine à des publics qui ne lisent pas la
              presse associative ? Comment financer en continu, hors campagnes
              ponctuelles ? La réponse est venue d'un dîner à Orléans :{" "}
              <strong>partager la cuisine</strong>.
            </p>
            <p>
              <strong>Christophe Hay</strong>, chef étoilé attaché à la Loire,
              a conçu une carte de mezze gastronomiques qui marient les
              produits ligériens (sandre, anguille fumée, vinaigre Martin-Pouret
              dans une mayonnaise) et les épices marocaines. Pas un fusion
              gimmick — un dialogue entre deux terroirs qui, à 2 700 km, ont
              plus en commun qu'on ne croit (le tuffeau de la Loire, le grès
              de l'Atlas).
            </p>
            <p>
              <strong>Martin-Pouret</strong>, vinaigrier d'Orléans depuis
              <strong> 1797</strong>, fournit ses vinaigres en exclusivité.{" "}
              <strong>Sébastien Papion</strong>, maître-confiseur orléanais,
              apporte le cotignac (la pâte de coing du Val de Loire) qui
              dialogue avec les confitures de figue locales. Un kiosque, deux
              tables, une seule conversation.
            </p>
          </div>
        </article>

        <KiosqueSection />

        <section className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-loire-deep font-sans font-medium">
              Visiter le Kiosque
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-bridge-ink mt-3 leading-tight">
              Réserver une <em className="italic text-atlas-clay">soirée</em>
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-bridge-ink/85">
              Le Kiosque ouvre principalement les vendredis et samedis soirs en
              haute saison. Les groupes (associations, entreprises, voyages
              solidaires) sont accueillis sur réservation — possibilité d'une
              soirée privatisée avec tarif préférentiel pour les mécènes Or et
              Platinium.
            </p>
            <a
              href="/contact"
              className="inline-block mt-7 px-7 py-3 rounded-full bg-atlas-saffron hover:bg-atlas-cream text-bridge-ink font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg"
            >
              Réserver une soirée →
            </a>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/cooperative",
              eyebrow: "Production",
              title: "La Coopérative",
              description:
                "Les produits servis au Kiosque viennent en partie de notre coopérative.",
            },
            {
              href: "/maison-bledi",
              eyebrow: "Le centre",
              title: "La Maison Bledi",
              description:
                "Le bénéfice du Kiosque finance le fonctionnement du centre du Haut-Atlas.",
            },
            {
              href: "/mecenat",
              eyebrow: "Soutenir",
              title: "Devenir mécène",
              description:
                "Privatisation du Kiosque incluse dans les niveaux Or et Platinium.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
