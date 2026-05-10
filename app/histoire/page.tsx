import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { HistoireSection } from "@/components/sections/HistoireSection";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Notre histoire — du Sri Lanka au Haut-Atlas",
  description:
    "Depuis 2015, l'Association Partage tisse un fil entre Orléans, le Sri Lanka et le Haut-Atlas. Genèse, missions de scolarisation, ouverture de la Maison Bledi.",
  alternates: { canonical: `${SITE_URL}/histoire` },
};

export default function HistoirePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="loire"
          eyebrow="Depuis 2015"
          title={
            <>
              Notre <em className="italic text-atlas-saffron">histoire</em>
            </>
          }
          subtitle="Dix ans de partage, trois pays, une seule conviction : la solidarité ne connaît pas les frontières."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Histoire" },
          ]}
        />

        {/* Bloc narratif d'ouverture — long format pour le SEO */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="prose-narrative space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              <strong className="text-bridge-ink">Tout commence à Orléans</strong>,
              au bord d'une Loire encore brumeuse de l'aube. Quelques amis,
              chacun avec ses entreprises, ses cuisines, ses ateliers, partagent
              le même constat : il existe des familles qui n'arrivent pas à
              envoyer leurs enfants à l'école faute de quelques fournitures.
              Pas en France — au Sri Lanka, après le tsunami et les crises qui
              ont suivi.
            </p>

            <p>
              Le geste fondateur tient en peu : <strong>30 cartables</strong>,
              remplis pour une rentrée. Les fournitures complètes pour l'année.
              Le financement du transport quand l'école est trop loin. Pas de
              grands discours — un envoi, une rentrée, un visage souriant en
              retour. L'association nait en 2015 de cette mécanique simple et
              s'engage à la répéter chaque année.
            </p>

            <p>
              Très vite, le projet déborde. Une famille bénéficiaire devient
              elle-même donatrice. Un ancien enfant scolarisé revient, des
              années plus tard, expliquer en quoi l'école a changé sa
              trajectoire. C'est cette boucle vertueuse qui pousse l'équipe à
              imaginer plus grand : <em>un lieu</em>, et plus seulement
              <em> un envoi</em>.
            </p>
          </div>
        </article>

        {/* La timeline existante */}
        <HistoireSection />

        {/* Bloc de fond — Sri Lanka aujourd'hui */}
        <section className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-loire-deep font-sans font-medium">
              Le Sri Lanka, aujourd'hui
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink mt-3 leading-tight">
              Une <em className="italic text-atlas-clay">mission</em> qui
              continue
            </h2>
            <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-bridge-ink/85">
              <p>
                Dix ans après le geste fondateur, le programme scolaire au Sri
                Lanka est devenu une institution discrète. Chaque rentrée, des
                bénévoles orléanais et des familles d'accueil sri-lankaises se
                coordonnent pour identifier les enfants qui ne pourraient pas
                rejoindre l'école sans soutien matériel.
              </p>
              <p>
                Le matériel est acheté localement, autant que possible, pour
                soutenir l'économie de la zone. Les fournitures sont remises
                directement aux familles, jamais via des intermédiaires
                rémunérés. <strong>100 % de chaque don dédié à ce programme
                arrive aux destinataires.</strong>
              </p>
              <p>
                C'est la même philosophie qui guide nos actions au Haut-Atlas
                depuis 2018 : présence locale, partenariats de confiance, pas
                d'écran administratif entre le donateur et l'enfant.
              </p>
            </div>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/maison-bledi",
              eyebrow: "Le centre marocain",
              title: "La Maison Bledi",
              description:
                "Notre lieu permanent au Haut-Atlas, accessible à tous, autosuffisant en énergie.",
            },
            {
              href: "/mecenat",
              eyebrow: "Soutenir",
              title: "Devenir mécène",
              description:
                "Quatre niveaux d'engagement, quatre impacts concrets. 60 % de réduction d'impôt.",
            },
            {
              href: "/cooperative",
              eyebrow: "Production locale",
              title: "La Coopérative",
              description:
                "Savons bio et huiles vierges produits par les femmes du village.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
