import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { BledisSection } from "@/components/sections/BledisSection";
import { AstronomieSection } from "@/components/sections/AstronomieSection";
import { SITE_URL } from "@/lib/seo";

const RENDERS_3D = [
  {
    src: "/images/maison-bledi/facade-rouge-rooftop.jpg",
    alt: "Façade principale de la Maison Bledi en pisé rouge — bâtiment cubique avec trois grandes baies vitrées au rez-de-chaussée et terrasse rooftop ceinturée d'un garde-corps inox, meublée de plantes en pot et fauteuils outdoor",
    caption: "La façade principale — pisé rouge, baies vitrées plein-pied, rooftop végétalisé",
  },
  {
    src: "/images/maison-bledi/bungalows-hamac.jpg",
    alt: "Vue de face des deux bungalows de répit en pisé rouge, encadrés de palmiers dattiers et de cactus, avec un hamac tendu entre les deux et deux allées en pierres lumineuses au sol",
    caption: "Les deux bungalows de répit — pisé ocre, hamac partagé, jardin sec berbère",
  },
  {
    src: "/images/maison-bledi/piscine-aerienne.jpg",
    alt: "Vue aérienne drone de la piscine en L de la Maison Bledi, encadrée de deux palmiers dattiers et d'une rampe d'accès PMR en pente douce qui descend dans l'eau",
    caption: "Vue drone — piscine en L avec rampe d'accès PMR et palmiers en symétrie",
  },
];

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

        {/* Galerie des projections 3D — architecture du centre */}
        <section className="py-16 md:py-24 px-5 md:px-8 lg:px-12 bg-bridge-cream">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-10 md:mb-14">
              <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium">
                Projections architecturales
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink mt-3 leading-tight font-light tracking-tight">
                À quoi ressemble{" "}
                <em className="italic text-atlas-clay">la Maison Bledi</em>
              </h2>
              <p className="mt-5 text-base md:text-lg text-bridge-ink/65 leading-relaxed font-light">
                Trois vues issues du plan architectural du centre — façade
                principale, bungalows de répit et piscine accessible PMR.
                Le bâti reprend les codes berbères du pisé teinté à
                l'ocre rouge, dans un dessin contemporain à toit-terrasse
                végétalisé.
              </p>
            </div>

            {/* Layout asymétrique : 1 grande image + 2 plus petites */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
              {/* Image 1 — façade principale (grande, col-span 8) */}
              <figure className="md:col-span-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] bg-loire-stone/20">
                  <Image
                    src={RENDERS_3D[0].src}
                    alt={RENDERS_3D[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <figcaption className="mt-3 text-xs text-bridge-ink/55 italic font-serif">
                  {RENDERS_3D[0].caption}
                </figcaption>
              </figure>

              {/* Image 2 — bungalows (col-span 4) */}
              <figure className="md:col-span-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] bg-loire-stone/20">
                  <Image
                    src={RENDERS_3D[1].src}
                    alt={RENDERS_3D[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <figcaption className="mt-3 text-xs text-bridge-ink/55 italic font-serif">
                  {RENDERS_3D[1].caption}
                </figcaption>
              </figure>

              {/* Image 3 — piscine (col-span 12 pleine largeur) */}
              <figure className="md:col-span-12">
                <div className="relative aspect-[21/9] md:aspect-[21/8] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] bg-loire-stone/20">
                  <Image
                    src={RENDERS_3D[2].src}
                    alt={RENDERS_3D[2].alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <figcaption className="mt-3 text-xs text-bridge-ink/55 italic font-serif">
                  {RENDERS_3D[2].caption}
                </figcaption>
              </figure>
            </div>
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
