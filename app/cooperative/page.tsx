import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { CooperativeSection } from "@/components/sections/CooperativeSection";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "La Coopérative — savons bio et huiles vierges du Haut-Atlas",
  description:
    "Savons au lait de chèvre et d'ânesse, huile d'olive et d'argan vierges. Production artisanale par les femmes du village, autonomie économique locale.",
  alternates: { canonical: `${SITE_URL}/cooperative` },
};

export default function CooperativePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="atlas"
          eyebrow="Production locale et bio"
          title={
            <>
              La <em className="italic text-atlas-cream">Coopérative</em>
            </>
          }
          subtitle="Une savonnerie et une presse à huile gérées par les femmes du village. Chaque achat finance directement leur autonomie économique."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Coopérative" },
          ]}
        />

        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              La coopérative est née d'une question pratique : que faire de
              l'huile d'argan que les familles du village pressaient déjà chez
              elles, et du lait des chèvres qu'elles élevaient ? Une réponse
              simple — créer un atelier <strong>collectif</strong>, partagé,
              avec un savoir-faire transmis et un revenu équitable.
            </p>
            <p>
              <strong>Saponification à froid</strong> pour les savons : une
              méthode lente qui préserve les vitamines naturelles du lait. Cure
              de quatre semaines avant la mise en vente. Le lait de chèvre
              vient des troupeaux du village voisin ; le lait d'ânesse arrive
              d'un élevage partenaire à 40 km, livré frais une fois par
              semaine.
            </p>
            <p>
              Pour les huiles, <strong>première pression à froid</strong>
              uniquement. L'olive est de la variété Picholine marocaine, plus
              corsée que sa cousine française. L'argan est extraite à partir
              d'amandons torréfiés selon la méthode berbère traditionnelle —
              une nuance fondamentale : l'argan alimentaire n'est pas la même
              que l'argan cosmétique (qui, lui, n'est jamais torréfié).
            </p>
          </div>
        </article>

        <CooperativeSection />

        <section className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-ochre font-sans font-medium">
              Comment commander
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-bridge-ink mt-3 leading-tight">
              Acheter pour <em className="italic text-atlas-clay">soutenir</em>
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-bridge-ink/85">
              Les produits sont disponibles à la vente directe lors des
              événements organisés à Orléans, et à terme sur la boutique en
              ligne de l'association. Pour les commandes groupées (entreprises,
              cadeaux d'affaires, mariages), contactez-nous : nous adaptons les
              quantités et l'emballage.
            </p>
            <a
              href="/contact"
              className="inline-block mt-7 px-7 py-3 rounded-full bg-atlas-saffron hover:bg-atlas-cream text-bridge-ink font-sans font-medium tracking-wide transition-all shadow-md hover:shadow-lg"
            >
              Nous contacter →
            </a>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/maison-bledi",
              eyebrow: "Le centre",
              title: "La Maison Bledi",
              description:
                "L'atelier de production se trouve dans l'enceinte du centre.",
            },
            {
              href: "/kiosque",
              eyebrow: "Agadir",
              title: "Le Kiosque Solidaire",
              description:
                "Les produits de la coopérative y rencontrent la gastronomie orléanaise.",
            },
            {
              href: "/mecenat",
              eyebrow: "Soutenir",
              title: "Devenir mécène",
              description:
                "Le mécénat permet d'investir dans les équipements de la coopérative.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
