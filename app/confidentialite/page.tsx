import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Association Partage",
  description:
    "Politique de protection des données personnelles de l'Association Partage : données collectées, finalités, conservation, droits RGPD.",
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="loire"
          eyebrow="Protection des données"
          title={
            <>
              Politique de{" "}
              <em className="italic text-atlas-saffron">confidentialité</em>
            </>
          }
          subtitle="Quelles données nous collectons, pourquoi, pendant combien de temps, et quels sont vos droits — en clair."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Confidentialité" },
          ]}
        />

        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-12 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <section>
              <p>
                La présente politique décrit la manière dont l'Association
                Partage collecte et traite vos données personnelles dans le
                cadre de votre navigation sur ce site, conformément au
                Règlement Général sur la Protection des Données (RGPD,
                règlement UE 2016/679) et à la loi Informatique et Libertés
                modifiée.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement de vos données personnelles est{" "}
                <strong className="text-bridge-ink">
                  l'Association Partage
                </strong>
                , dont le siège est situé à Orléans.
              </p>
              <p className="mt-3">
                Pour toute question relative à vos données, écrivez à{" "}
                <a
                  href="mailto:contact@association-partage.fr"
                  className="text-atlas-clay underline hover:text-atlas-terracotta"
                >
                  contact@association-partage.fr
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Données collectées
              </h2>
              <p>
                Nous ne collectons que les données strictement nécessaires aux
                finalités décrites ci-dessous.
              </p>
              <div className="mt-4 rounded-2xl border border-loire-stone/50 bg-bridge-cream p-5 md:p-6">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-atlas-clay font-sans font-medium mb-3">
                  Formulaire de contact
                </p>
                <ul className="space-y-1 list-disc pl-5 text-sm md:text-base">
                  <li>Nom et prénom</li>
                  <li>Adresse de courriel</li>
                  <li>Numéro de téléphone (facultatif)</li>
                  <li>Objet de la demande (information, mécénat, autre)</li>
                  <li>
                    Niveau de mécénat envisagé, le cas échéant (Bronze,
                    Silver, Gold, Platinium)
                  </li>
                  <li>Contenu du message</li>
                  <li>
                    Indication explicite de votre consentement au traitement
                  </li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-bridge-ink/65">
                En dehors du formulaire de contact, aucune donnée
                d'identification n'est collectée à votre insu lors de la
                navigation.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Finalités du traitement
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Répondre à votre demande de contact ou d'information.</li>
                <li>
                  Étudier votre proposition de mécénat ou de partenariat et y
                  donner suite.
                </li>
                <li>
                  Assurer le suivi des conventions de don et de mécénat
                  signées avec l'association.
                </li>
                <li>
                  Vous informer ponctuellement des actualités de l'association,
                  uniquement si vous y avez consenti expressément.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Base légale
              </h2>
              <p>
                Le traitement repose sur votre <strong>consentement</strong>{" "}
                exprès (case à cocher du formulaire) pour la réponse à votre
                demande, et sur l'<strong>intérêt légitime</strong> de
                l'association pour le suivi opérationnel des partenariats et
                des conventions de mécénat (article 6.1.a et 6.1.f du RGPD).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Destinataires
              </h2>
              <p>
                Vos données sont accessibles aux seuls membres du bureau
                bénévole de l'Association Partage, dans la stricte mesure
                nécessaire à leurs missions.
              </p>
              <p className="mt-3">
                Pour assurer le fonctionnement technique du site, deux
                prestataires sous-traitants interviennent en qualité de{" "}
                <em>sous-traitants au sens de l'article 28 du RGPD</em> :
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-bridge-ink">Vercel Inc.</strong> —
                  hébergement du site et délivrance des pages (États-Unis).
                </li>
                <li>
                  <strong className="text-bridge-ink">Formspree</strong> —
                  traitement de l'envoi du formulaire de contact (États-Unis).
                </li>
              </ul>
              <p className="mt-3">
                Aucune donnée n'est cédée, louée ou vendue à des tiers à des
                fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Transferts hors Union européenne
              </h2>
              <p>
                Les deux sous-traitants techniques mentionnés ci-dessus sont
                basés aux États-Unis. Les transferts de données sont encadrés
                par les mécanismes de protection reconnus par la Commission
                européenne :
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>
                  Certification au <em>Data Privacy Framework</em> (DPF)
                  lorsque le sous-traitant y adhère.
                </li>
                <li>
                  À défaut, <em>clauses contractuelles types</em> de la
                  Commission européenne (article 46.2.c du RGPD).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Durée de conservation
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-bridge-ink">
                    Demandes simples
                  </strong>{" "}
                  (information, contact ponctuel) : 3 ans à compter du dernier
                  échange.
                </li>
                <li>
                  <strong className="text-bridge-ink">
                    Conventions de mécénat et de don
                  </strong>{" "}
                  : 10 ans, conformément aux obligations comptables et
                  fiscales applicables aux associations bénéficiant du régime
                  d'intérêt général.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Vos droits
              </h2>
              <p>
                Vous disposez, à tout moment, des droits suivants sur vos
                données personnelles :
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Droit d'accès et de rectification</li>
                <li>Droit à l'effacement (« droit à l'oubli »)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>
                  Droit d'opposition, y compris au traitement à des fins de
                  communication
                </li>
                <li>
                  Droit de retirer votre consentement à tout moment, sans
                  remettre en cause la licéité des traitements antérieurs
                </li>
                <li>
                  Droit de définir des directives relatives à la conservation,
                  à l'effacement et à la communication de vos données après
                  votre décès
                </li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, adressez votre demande à{" "}
                <a
                  href="mailto:contact@association-partage.fr"
                  className="text-atlas-clay underline hover:text-atlas-terracotta"
                >
                  contact@association-partage.fr
                </a>{" "}
                en précisant l'objet de votre requête et en joignant un
                justificatif d'identité si nécessaire.
              </p>
              <p className="mt-4">
                Si vous estimez, après nous avoir contactés, que vos droits
                ne sont pas respectés, vous pouvez introduire une réclamation
                auprès de la{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-atlas-clay underline hover:text-atlas-terracotta"
                >
                  Commission Nationale de l'Informatique et des Libertés (CNIL)
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Cookies et traceurs
              </h2>
              <p>
                Le site ne dépose <strong>aucun cookie publicitaire</strong>,
                aucun traceur d'analyse comportementale, et n'intègre aucun
                outil de mesure d'audience tiers (Google Analytics, Meta
                Pixel, etc.).
              </p>
              <p className="mt-3">
                Seuls des cookies strictement techniques, indispensables au
                bon fonctionnement du site, peuvent être déposés. Ils ne
                requièrent pas de consentement préalable au sens de l'article
                82 de la loi Informatique et Libertés.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Sécurité
              </h2>
              <p>
                Les échanges avec le site sont chiffrés (HTTPS / TLS). Les
                données collectées via le formulaire sont transmises de manière
                sécurisée jusqu'à leur destinataire. L'association met en
                œuvre des mesures organisationnelles et techniques
                proportionnées aux risques (accès restreint, suppression
                périodique, sensibilisation du bureau).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Évolution de la présente politique
              </h2>
              <p>
                Cette politique peut être amenée à évoluer pour refléter les
                changements de pratiques de l'association ou la réglementation
                applicable. La date de dernière mise à jour est indiquée
                ci-dessous.
              </p>
            </section>

            <p className="text-sm text-bridge-ink/55 italic pt-8 border-t border-loire-stone/50">
              Dernière mise à jour : 11 mai 2026.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
