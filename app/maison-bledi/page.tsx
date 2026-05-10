import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { BledisSection } from "@/components/sections/BledisSection";
import { AstronomieSection } from "@/components/sections/AstronomieSection";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "La Maison Bledi — centre PMR du Haut-Atlas",
  description:
    "Notre centre permanent au Haut-Atlas : 130 m² accessibles aux personnes à mobilité réduite, autosuffisance solaire, bungalows de répit, recyclage des eaux.",
  alternates: { canonical: `${SITE_URL}/maison-bledi` },
};

const SPECS = [
  { label: "Surface bâtie", value: "130 m²" },
  { label: "Niveaux", value: "3 (R+2)" },
  { label: "Chambres PMR", value: "4" },
  { label: "Bungalows répit", value: "2" },
  { label: "Énergie solaire", value: "100 % autonomie" },
  { label: "Eau", value: "Recyclée + pluvieuse" },
];

export default function MaisonBlediPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="atlas"
          eyebrow="Au cœur du Haut-Atlas"
          title={
            <>
              La Maison <em className="italic text-atlas-cream">Bledi</em>
            </>
          }
          subtitle="Un lieu pensé dès la première pierre pour être accessible à tous, autosuffisant et profondément ancré dans son village."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Maison Bledi" },
          ]}
        />

        {/* Bloc narratif */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              Quand l'idée d'un centre permanent au Maroc a germé, deux
              exigences sont devenues non négociables :{" "}
              <strong>l'accessibilité totale</strong> et{" "}
              <strong>l'autosuffisance énergétique</strong>. Pas comme des
              objectifs techniques abstraits — comme la condition même de la
              mission.
            </p>
            <p>
              L'accessibilité, parce qu'on a vu trop d'établissements promettre
              "l'inclusion" et oublier la marche d'entrée. Chez Bledi : rampes
              à 6 % maximum, sanitaires aux normes, cuisine adaptée, chambres
              avec lit médicalisable, terrasses sans seuil. Une famille avec
              fauteuil roulant peut traverser l'intégralité du bâtiment sans
              jamais rencontrer d'obstacle.
            </p>
            <p>
              L'autosuffisance, parce que le Haut-Atlas reste fragile sur les
              réseaux. La toiture porte sa propre centrale photovoltaïque ;
              l'eau chaude est solaire toute l'année (300 jours d'ensoleillement
              en moyenne) ; la récupération d'eau de pluie alimente l'arrosage
              du jardin. Les eaux grises passent par une phytoépuration avant
              de retourner au sol.
            </p>
          </div>
        </article>

        {/* Fiche technique */}
        <section className="bg-atlas-cream/30 py-12 md:py-16 px-5 md:px-6 border-y border-atlas-ochre/30">
          <div className="max-w-4xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
              Fiche technique
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-bridge-ink text-center mt-3 mb-10">
              En <em className="italic text-atlas-clay">chiffres</em>
            </h2>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {SPECS.map((spec) => (
                <div key={spec.label} className="text-center">
                  <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-atlas-ochre font-sans font-medium">
                    {spec.label}
                  </dt>
                  <dd className="font-serif text-2xl md:text-3xl text-bridge-ink mt-2">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* La section visuelle existante */}
        <BledisSection />

        {/* Astronomie liée */}
        <AstronomieSection />

        <RelatedLinks
          items={[
            {
              href: "/cooperative",
              eyebrow: "Production locale",
              title: "La Coopérative",
              description:
                "Savons et huiles bio fabriqués sur place par les femmes du village.",
            },
            {
              href: "/mecenat",
              eyebrow: "Soutenir",
              title: "Devenir mécène",
              description:
                "Le niveau Or finance un Quadrix tout-terrain ; le Platinium un véhicule TPMR complet.",
            },
            {
              href: "/histoire",
              eyebrow: "Notre genèse",
              title: "L'histoire",
              description:
                "Du Sri Lanka 2015 à l'inauguration de la Maison Bledi en 2021.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
