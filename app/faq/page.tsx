import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Questions fréquentes — Association Partage",
  description:
    "Qui sommes-nous, comment va l'argent, êtes-vous bénévoles, comment devenir bénévole, peut-on visiter la Maison Bledi — les réponses aux questions que l'on nous pose le plus souvent.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

type FaqItem = { q: string; a: string };
type FaqGroup = { title: string; eyebrow: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    eyebrow: "Identité & valeurs",
    title: "Qui nous sommes",
    items: [
      {
        q: "L'Association Partage est-elle reconnue d'utilité publique ?",
        a: "Non : nous sommes reconnus d'intérêt général, ce qui est différent. L'utilité publique nécessite un décret en Conseil d'État et plusieurs millions d'euros de budget annuel — un statut taillé pour les très grandes structures. L'intérêt général se déclare auprès de l'administration fiscale et permet, lui, d'émettre des reçus fiscaux ouvrant droit à la réduction d'impôt. Pour les donateurs particuliers comme entreprises, l'effet fiscal est identique.",
      },
      {
        q: "Êtes-vous une association religieuse ?",
        a: "Non, l'association est strictement laïque. Notre action se déploie au Maroc, pays à majorité musulmane, et au Sri Lanka, pays à majorité bouddhiste — sans prosélytisme d'aucune sorte. Nos bénévoles et bénéficiaires partagent toutes les confessions et aucune.",
      },
      {
        q: "Êtes-vous une association politique ?",
        a: "Non. L'Association Partage est apolitique et non partisane. Elle ne soutient aucun parti, ne participe à aucune campagne électorale, et n'accepte pas de don ou de mécénat émis dans un cadre politique.",
      },
    ],
  },
  {
    eyebrow: "Terrain & gouvernance",
    title: "Comment nous fonctionnons",
    items: [
      {
        q: "Êtes-vous tous bénévoles ?",
        a: "Oui, 100 % bénévoles côté France. Le bureau, le conseil d'administration, les missions terrain : aucune rémunération versée par l'association. Au Maroc, des intervenants locaux peuvent être indemnisés pour des prestations ponctuelles (gardiennage de la Maison Bledi, animation d'ateliers) — c'est nécessaire pour soutenir l'économie locale et ne pas substituer du bénévolat français à un emploi marocain.",
      },
      {
        q: "Pourquoi le Maroc et le Sri Lanka, deux pays si différents ?",
        a: "Le Sri Lanka, c'est le geste fondateur : 30 cartables envoyés en 2015 après le tsunami et les crises qui ont suivi. Nous y soutenons toujours des cycles scolaires. Le Maroc, c'est le lieu — la Maison Bledi au Haut-Atlas, qui permet d'ancrer un projet plus large autour de l'accueil, de l'accessibilité PMR et de la coopérative bio. Deux géographies, une même conviction : la solidarité ne s'arrête pas aux frontières.",
      },
      {
        q: "Comment puis-je vérifier que les fonds arrivent bien sur le terrain ?",
        a: "Chaque mécène signataire d'une convention reçoit un rapport d'usage annuel avec photos datées, factures des dépenses engagées et bilan moral du projet financé. Pour les dons ponctuels, nos comptes annuels sont communiqués sur demande à contact@association-partage.fr. À terme nous publierons aussi un rapport annuel public.",
      },
      {
        q: "Comment les enfants bénéficiaires sont-ils sélectionnés ?",
        a: "Au Sri Lanka, par les écoles partenaires locales — ce sont les enseignants qui identifient les familles en difficulté et nous transmettent les listes nominatives. Au Maroc, par les associations partenaires du Haut-Atlas et le tissu communautaire de proximité. L'association ne sélectionne jamais directement : ce sont les acteurs locaux, qui connaissent les réalités, qui pilotent.",
      },
    ],
  },
  {
    eyebrow: "Bénévolat, visites & dons",
    title: "Comment nous rejoindre",
    items: [
      {
        q: "Puis-je devenir bénévole ?",
        a: "Oui, avec joie. Côté France, plusieurs profils nous sont utiles : compétences administratives (comptabilité, juridique, RH), communication (rédaction, photo, vidéo), événementiel (organisation de tournois caritatifs, dîners). Côté Maroc, nous accueillons aussi des missions de terrain à la Maison Bledi (1 à 4 semaines), réservées aux personnes engagées sur la durée. Écris-nous à contact@association-partage.fr en présentant ton parcours et tes disponibilités.",
      },
      {
        q: "Puis-je visiter la Maison Bledi sans être mécène ?",
        a: "Oui, sur invitation. La Maison Bledi n'est pas un lieu touristique — c'est un centre d'accueil dédié à nos missions. Mais nous organisons régulièrement des week-ends découverte pour les donateurs réguliers, les partenaires et leurs proches. Demande à recevoir le calendrier à contact@association-partage.fr.",
      },
      {
        q: "Acceptez-vous les dons en nature ?",
        a: "Oui, sous conditions. Nous acceptons les dons matériels (fournitures scolaires, équipement médical PMR, matériel de cuisine professionnel) à condition qu'ils soient neufs ou en parfait état, et qu'ils correspondent à un besoin identifié sur le terrain. Avant tout envoi, contacte-nous : nous avons une logistique resserrée et préférons coordonner les arrivages.",
      },
    ],
  },
];

const allItems = FAQ_GROUPS.flatMap((g) => g.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq`,
  mainEntity: allItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
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
          eyebrow="Vos questions, nos réponses"
          title={
            <>
              Questions{" "}
              <em className="italic text-atlas-saffron">fréquentes</em>
            </>
          }
          subtitle="Tout ce qu'on nous demande le plus souvent — sur l'association, le terrain, le bénévolat, les dons. Si une réponse manque, écrivez-nous."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "FAQ" },
          ]}
        />

        {/* Intro éditoriale */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <p className="text-base md:text-lg leading-relaxed text-bridge-ink/85">
            Cette page rassemble les{" "}
            <strong className="text-bridge-ink">questions récurrentes</strong>{" "}
            que nous recevons depuis le formulaire de contact ou en direct.
            Pour les questions <em>fiscales</em> liées au mécénat, une FAQ
            dédiée se trouve en bas de la{" "}
            <a
              href="/mecenat#faq"
              className="text-atlas-clay underline hover:text-atlas-terracotta"
            >
              page mécénat
            </a>
            .
          </p>
        </article>

        {/* Groupes successifs */}
        <section className="max-w-3xl mx-auto px-5 md:px-6 pb-10 md:pb-20">
          {FAQ_GROUPS.map((group, gi) => (
            <div
              key={group.title}
              className="mt-12 md:mt-20 first:mt-0 scroll-mt-24"
            >
              <header className="mb-8 md:mb-10">
                <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium">
                  {String(gi + 1).padStart(2, "0")} · {group.eyebrow}
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-bridge-ink mt-3 leading-[1.05] font-light tracking-tight">
                  {group.title}
                </h2>
              </header>

              <dl className="space-y-5">
                {group.items.map((item, i) => (
                  <details
                    key={`${gi}-${i}`}
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
          ))}
        </section>

        {/* CTA contact */}
        <section className="bg-bridge-ink py-16 md:py-24 px-5 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-atlas-saffron font-sans font-medium">
              Une question qui n'est pas listée ?
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-loire-pale mt-4 leading-tight">
              Écrivez-<em className="italic text-atlas-saffron">nous</em>
            </h2>
            <p className="mt-6 text-base md:text-lg text-loire-pale/75 leading-relaxed font-light max-w-2xl mx-auto">
              Nous lisons et répondons à tous les messages. Comptez 48 à 72
              heures en moyenne pour une réponse circonstanciée.
            </p>
            <a
              href="mailto:contact@association-partage.fr"
              className="inline-flex items-center gap-3 mt-8 px-7 py-3 rounded-full bg-atlas-saffron hover:bg-atlas-terracotta text-bridge-ink font-sans font-medium tracking-wide text-sm transition-all duration-500 shadow-md hover:shadow-lg"
            >
              contact@association-partage.fr
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              href: "/histoire",
              eyebrow: "Notre histoire",
              title: "Dix ans de partage",
              description:
                "Du tsunami sri-lankais aux fondations de la Maison Bledi — la chronologie complète.",
            },
            {
              href: "/mecenat",
              eyebrow: "Soutenir",
              title: "Devenir mécène",
              description:
                "Quatre niveaux d'engagement, 60 à 66 % de réduction fiscale, impact mesurable.",
            },
            {
              href: "/partenaires",
              eyebrow: "Écosystème",
              title: "Nos partenaires",
              description:
                "Les 16 structures qui rendent possibles, chaque jour, nos missions.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
