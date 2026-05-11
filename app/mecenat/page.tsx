import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { MecenatTable } from "@/components/ui/MecenatTable";
import { ColombelCard } from "@/components/parrains/ColombelCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Devenir mécène — Bronze, Argent, Or, Platinium",
  description:
    "Quatre niveaux d'engagement de 1 000 € à 50 000 € et plus. 60 % de réduction d'impôt sur le revenu, 60 % sur l'IS. Soutien direct à la Maison Bledi.",
  alternates: { canonical: `${SITE_URL}/mecenat` },
};

const FAQ = [
  {
    q: "Quelle est la défiscalisation applicable ?",
    a: "Pour les particuliers : 66 % de réduction d'impôt sur le revenu, dans la limite de 20 % du revenu imposable. Pour les entreprises : 60 % de réduction d'IS, dans la limite de 0,5 % du chiffre d'affaires HT (article 238 bis du CGI). Le reliquat est reportable sur 5 ans.",
  },
  {
    q: "Recevons-nous un reçu fiscal ?",
    a: "Oui, automatiquement, dans les 15 jours suivant le don. L'association est reconnue d'intérêt général depuis 2015 et émet ses reçus conformément aux articles 200 et 238 bis du Code général des impôts.",
  },
  {
    q: "Comment est utilisé l'argent ?",
    a: "Chaque convention de mécénat précise l'affectation : équipement de la Maison Bledi, achat d'un véhicule TPMR, soutien à un cycle scolaire au Sri Lanka, etc. Un rapport d'usage annuel est transmis à chaque mécène, avec photos et chiffres.",
  },
  {
    q: "Peut-on visiter la Maison Bledi ?",
    a: "Oui. Les niveaux Argent, Or et Platinium incluent une visite organisée du centre au Haut-Atlas, avec hébergement et repas pris sur place. Les déplacements ne sont pas inclus mais nous facilitons leur organisation.",
  },
  {
    q: "Le mécénat peut-il être étalé dans le temps ?",
    a: "Bien sûr. Une convention triennale ou quinquennale est possible, avec versements annuels. Le niveau de mécénat retenu correspond alors au cumul des versements.",
  },
  {
    q: "Quelle différence entre un don et un mécénat ?",
    a: "Un don, c'est un geste ponctuel — vous nous soutenez sur une action précise, vous recevez un reçu fiscal, c'est fini. Le mécénat, c'est un engagement formalisé par une convention écrite, généralement pluriannuel, avec une affectation claire des fonds (un projet, un équipement, une saison scolaire) et un rapport d'usage annuel. Le mécénat ouvre aussi l'accès aux contreparties — visite de la Maison Bledi, présence aux événements caritatifs, mention dans nos communications. Les deux bénéficient de la même réduction fiscale.",
  },
  {
    q: "Mon don ou mécénat est-il versé en toute sécurité ?",
    a: "Oui. Les versements se font par virement bancaire directement sur le compte de l'association (RIB transmis à la signature de la convention) ou par chèque à l'ordre de l'Association Partage. Aucun paiement par carte bancaire en ligne pour le moment : c'est un choix délibéré qui élimine tout risque d'interception et évite à l'association les frais de plateforme. Pour les particuliers qui préfèrent une plateforme grand public, nous étudions un partenariat avec HelloAsso.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function MecenatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="bridge"
          eyebrow="Engagez-vous à nos côtés"
          title={
            <>
              Devenir <em className="italic text-atlas-saffron">mécène</em>
            </>
          }
          subtitle="Quatre niveaux d'engagement, quatre impacts concrets, jusqu'à 66 % de réduction d'impôt. Choisissez celui qui correspond à votre projet."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Mécénat" },
          ]}
        />

        <section className="py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <MecenatTable />
          </div>
        </section>

        {/* Bandeau fiscal */}
        <section className="bg-loire-deep text-loire-pale py-12 md:py-16 px-5 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-cream font-sans font-medium">
              Article 200 et 238 bis du CGI
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mt-3 leading-tight">
              <em className="italic text-atlas-saffron">66 %</em> de réduction
              fiscale
            </h2>
            <p className="mt-5 text-base md:text-lg text-loire-pale/90 max-w-2xl mx-auto leading-relaxed">
              Pour les particuliers, un don de 1 000 € ne coûte que{" "}
              <strong className="text-atlas-cream">340 €</strong> après
              déduction. Pour les entreprises (60 % d'IS), un mécénat de
              10 000 € revient à <strong className="text-atlas-cream">4 000 €</strong>.
            </p>
          </div>
        </section>

        {/* Parrain */}
        <section className="py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
              Notre parrain
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-10 md:mb-12">
              Une voix qui <em className="italic text-atlas-clay">porte</em>
            </h2>
            <ColombelCard />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-loire-pale/40 py-16 md:py-24 px-5 md:px-6 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-loire-deep font-sans font-medium text-center">
              Questions fréquentes
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-10">
              Vos <em className="italic text-atlas-clay">questions</em>
            </h2>
            <dl className="space-y-5">
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-loire-stone/60 bg-bridge-cream p-5 md:p-6 transition-colors open:border-atlas-clay/50"
                >
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
                    <dt className="font-serif text-lg md:text-xl text-bridge-ink leading-snug">
                      {item.q}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="text-atlas-clay text-2xl leading-none flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 text-sm md:text-base text-bridge-ink/80 leading-relaxed">
                    {item.a}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </section>

        {/* Formulaire de prise de contact */}
        <section className="py-16 md:py-24 px-5 md:px-6 bg-bridge-cream">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
              Construisons ensemble
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink text-center mt-3 mb-3">
              Prendre <em className="italic text-atlas-clay">contact</em>
            </h2>
            <p className="text-center text-base md:text-lg text-bridge-ink/75 max-w-2xl mx-auto leading-relaxed mb-10">
              Décrivez-nous votre projet de mécénat — nous revenons vers vous
              sous 48 heures avec une proposition de convention adaptée.
            </p>
            <div className="rounded-2xl border border-loire-stone/60 bg-bridge-cream/95 p-6 md:p-10 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/maison-bledi",
              eyebrow: "Le centre",
              title: "La Maison Bledi",
              description:
                "Découvrez ce que votre mécénat finance : 130 m² PMR, énergie solaire.",
            },
            {
              href: "/histoire",
              eyebrow: "Notre genèse",
              title: "L'histoire",
              description:
                "Du Sri Lanka 2015 à aujourd'hui, dix ans de présence solidaire.",
            },
            {
              href: "/kiosque",
              eyebrow: "Agadir",
              title: "Le Kiosque Solidaire",
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
