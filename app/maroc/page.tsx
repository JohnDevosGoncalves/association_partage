import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { EcosystemeGallery } from "@/components/sections/parts/Bledis/EcosystemeGallery";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le Maroc — le Haut-Atlas, terre d'accueil de la Maison Bledi",
  description:
    "Vallée berbère, oued, faune endémique, village millénaire. Pourquoi nous avons posé la Maison Bledi ici, dans le Haut-Atlas marocain, et avec qui nous y construisons depuis 2018.",
  alternates: { canonical: `${SITE_URL}/maroc` },
};

const REPERES = [
  {
    metric: "2 200 m",
    label: "Altitude moyenne",
    text: "La vallée se situe entre 2 000 et 2 400 mètres — ensoleillée 320 jours par an, fraîche la nuit.",
  },
  {
    metric: "2018",
    label: "Première mission",
    text: "Première visite de l'équipe orléanaise dans la vallée. Les fondations de la Maison Bledi sont posées en 2020.",
  },
  {
    metric: "4 200",
    label: "Habitants du douar",
    text: "Le village et ses hameaux satellites comptent près de 4 200 habitants, dont 1 600 enfants scolarisables.",
  },
  {
    metric: "3",
    label: "Jours par semaine",
    text: "Présence permanente d'une équipe d'animation et de coordination, en plus du gardien et de l'intendante.",
  },
];

const FAUNE_FLORE = [
  {
    nom: "L'agame de Bibron",
    famille: "Reptile endémique",
    text: "Lézard bleu-vert au cou orange, gardien des rochers chauds. Visible de mars à octobre sur les pierres ensoleillées.",
  },
  {
    nom: "L'écureuil de Berbérie",
    famille: "Mammifère endémique du Maghreb",
    text: "Le seul écureuil africain — rouquin, queue touffue, friand des amandes et fruits secs des arganiers.",
  },
  {
    nom: "L'aigrette garzette",
    famille: "Oiseau migrateur",
    text: "Posée sur les rochers de l'oued, elle pêche les petits poissons. Une présence quasi quotidienne en saison.",
  },
  {
    nom: "L'arganier",
    famille: "Arbre endémique",
    text: "Inscrit au patrimoine immatériel de l'UNESCO. Ses amandons font l'huile d'argan — cosmétique brute, alimentaire torréfiée.",
  },
];

export default function MarocPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="atlas"
          eyebrow="Vallée berbère du Haut-Atlas"
          title={
            <>
              Le <em className="italic text-atlas-cream">Maroc</em>
            </>
          }
          subtitle="Une vallée à 2 200 mètres d'altitude, un oued qui ne tarit jamais, un village en pisé ocre — et la Maison Bledi posée au milieu, comme une promesse."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Le Maroc" },
          ]}
        />

        {/* Bloc narratif d'ouverture */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <p>
              <strong className="text-bridge-ink">
                Le Haut-Atlas n'est pas un décor de carte postale
              </strong>
              . C'est un territoire vivant — une vallée où l'eau circule encore en
              vrai, où les murs de pisé tiennent depuis sept générations, où les
              enfants vont à l'école à pied le matin et reviennent en saluant les
              voisins. C'est ici, dans ce contexte précis, que nous avons posé la
              Maison Bledi.
            </p>

            <p>
              Le choix n'a pas été géographique au sens touristique. Il a été le
              résultat d'une rencontre, en 2018, entre des fondateurs de
              l'association et un caïd local soucieux du devenir de sa vallée. À
              partir de cette confiance — testée pendant deux ans — le terrain a
              été acheté, le bâti pensé, l'équipe locale recrutée. Pas une
              implantation extérieure, mais une{" "}
              <em>alliance avec un territoire</em>.
            </p>

            <p>
              Cette page raconte le Maroc tel que nous le connaissons : pas le
              Maroc des palais ni des riads de Marrakech, mais celui d'une vallée
              à 2 200 mètres où l'on parle tamazight, où l'on partage le thé
              avant tout, et où la solidarité — bien avant d'être un mot français
              — est un{" "}
              <em>réflexe ancien</em>.
            </p>
          </div>
        </article>

        {/* Repères chiffrés */}
        <section className="px-5 md:px-6 py-10 md:py-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
              Repères
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-12 leading-tight">
              La vallée en{" "}
              <em className="italic text-atlas-clay">quatre chiffres</em>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 py-8 border-t border-b border-atlas-ochre/30">
              {REPERES.map((r) => (
                <div key={r.label} className="text-center">
                  <div
                    className="font-serif text-4xl md:text-5xl font-extralight text-atlas-clay leading-none"
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

        {/* L'écosystème — galerie photos */}
        <section className="px-5 md:px-6 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-10 md:mb-14">
              <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium">
                L'écosystème
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink mt-3 leading-tight">
                Tout autour, le{" "}
                <em className="italic text-atlas-clay">vivant</em>
              </h2>
              <p className="mt-5 text-base md:text-lg text-bridge-ink/65 leading-relaxed font-light">
                La vallée vit. L'oued attire les hérons, les rochers chauffent les
                lézards, l'arganier nourrit les écureuils. Chacun est à sa place,
                la Maison Bledi avec.
              </p>
            </div>
            <EcosystemeGallery />
          </div>
        </section>

        {/* Faune & flore — fiches */}
        <section className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-ochre font-sans font-medium text-center">
              Espèces présentes
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-4 leading-tight">
              Faune &{" "}
              <em className="italic text-atlas-clay">flore</em> endémiques
            </h2>
            <p className="max-w-2xl mx-auto text-center text-base md:text-lg text-bridge-ink/65 leading-relaxed mb-12 font-light">
              Quatre habitants discrets de la vallée — observés depuis la Maison
              Bledi en toutes saisons.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FAUNE_FLORE.map((f) => (
                <li
                  key={f.nom}
                  className="rounded-2xl border border-atlas-ochre/30 bg-bridge-cream p-6 md:p-7"
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium">
                    {f.famille}
                  </p>
                  <h3 className="font-serif text-2xl text-bridge-ink mt-2 leading-tight">
                    {f.nom}
                  </h3>
                  <p className="mt-3 text-sm text-bridge-ink/70 leading-relaxed font-light">
                    {f.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Le village — Citation manifeste */}
        <section className="py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium mb-5">
              Le village et nous
            </p>
            <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-bridge-ink leading-[1.25] font-light">
              «&nbsp;Ici, on a appris à ne pas{" "}
              <em className="not-italic font-normal text-atlas-clay">
                arriver avec
              </em>{" "}
              une solution. On a appris à arriver les mains{" "}
              <em className="not-italic font-normal text-atlas-clay">vides</em> —
              à écouter ce que la vallée demande, et à répondre au rythme du
              village.&nbsp;»
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-bridge-ink/55 font-sans">
              <span className="w-8 h-px bg-atlas-clay/40" />
              <span>Carnet de bord · Mission Atlas 2022</span>
            </div>
          </div>
        </section>

        {/* CTA mécénat Atlas */}
        <section className="bg-bridge-ink py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-atlas-saffron font-sans font-medium">
              Mécénat Atlas
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-loire-pale mt-4 leading-tight">
              Soutenir la{" "}
              <em className="italic text-atlas-saffron">vallée</em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-loire-pale/75 leading-relaxed font-light max-w-2xl mx-auto">
              Les niveaux Or et Platinium permettent de financer le véhicule
              tout-terrain PMR et l'extension du potager solidaire.
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
              href: "/loire",
              eyebrow: "Notre port d'attache",
              title: "La Loire",
              description:
                "L'autre rive — Orléans, le Val, et les artisans qui rendent la mission possible.",
            },
            {
              href: "/maison-bledi",
              eyebrow: "Le centre",
              title: "La Maison Bledi",
              description:
                "Visite détaillée du bâtiment — 130 m², 3 niveaux, accessibilité totale PMR.",
            },
            {
              href: "/cooperative",
              eyebrow: "Production locale",
              title: "La Coopérative",
              description:
                "Savons et huiles produits dans la vallée par les femmes du village.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
