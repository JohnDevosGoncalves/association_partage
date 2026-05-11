import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentions légales — Association Partage",
  description:
    "Mentions légales du site de l'Association Partage : éditeur, hébergeur, conception, propriété intellectuelle et crédits.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="loire"
          eyebrow="Informations légales"
          title={
            <>
              Mentions <em className="italic text-atlas-saffron">légales</em>
            </>
          }
          subtitle="Identité de l'éditeur, hébergement, propriété intellectuelle — les obligations légales du site."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Mentions légales" },
          ]}
        />

        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
          <div className="space-y-12 text-base md:text-lg leading-relaxed text-bridge-ink/85">
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Éditeur du site
              </h2>
              <p>
                Le présent site est édité par{" "}
                <strong className="text-bridge-ink">
                  l'Association Partage
                </strong>
                , association régie par la loi du 1<sup>er</sup> juillet 1901
                relative au contrat d'association, reconnue d'intérêt général
                depuis 2015.
              </p>
              <ul className="mt-4 space-y-1 list-none">
                <li>
                  <span className="text-bridge-ink/55">Siège social :</span>{" "}
                  Orléans, France
                </li>
                <li>
                  <span className="text-bridge-ink/55">Courriel :</span>{" "}
                  <a
                    href="mailto:contact@association-partage.fr"
                    className="text-atlas-clay underline hover:text-atlas-terracotta"
                  >
                    contact@association-partage.fr
                  </a>
                </li>
                <li>
                  <span className="text-bridge-ink/55">Téléphone :</span> +33
                  (0)2 38 00 00 00
                </li>
                <li>
                  <span className="text-bridge-ink/55">
                    Directeur de la publication :
                  </span>{" "}
                  le ou la président·e de l'association
                </li>
              </ul>
              <p className="mt-4 text-sm text-bridge-ink/55 italic">
                Numéro RNA et identifiants administratifs disponibles sur
                simple demande à l'adresse ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Hébergement
              </h2>
              <p>
                Le site est hébergé par{" "}
                <strong className="text-bridge-ink">Vercel Inc.</strong>, dont
                le siège est situé au 340 S Lemon Avenue #4133, Walnut, CA
                91789, États-Unis.
              </p>
              <ul className="mt-4 space-y-1 list-none">
                <li>
                  <span className="text-bridge-ink/55">Site :</span>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-atlas-clay underline hover:text-atlas-terracotta"
                  >
                    vercel.com
                  </a>
                </li>
                <li>
                  <span className="text-bridge-ink/55">
                    Contact protection des données :
                  </span>{" "}
                  <a
                    href="mailto:privacy@vercel.com"
                    className="text-atlas-clay underline hover:text-atlas-terracotta"
                  >
                    privacy@vercel.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Conception et développement
              </h2>
              <p>
                Conception, design et développement web réalisés par{" "}
                <strong className="text-bridge-ink">John Devos</strong>,
                studio web basé à Orléans, en{" "}
                <em>mécénat de compétences</em> au bénéfice de l'association.
              </p>
              <p className="mt-3">
                <a
                  href="https://www.johndevos.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-atlas-clay underline hover:text-atlas-terracotta"
                >
                  www.johndevos.fr ↗
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des contenus du site (textes, photographies,
                illustrations, mise en page, code source) sont la propriété
                exclusive de l'Association Partage ou de ses partenaires, sauf
                mention contraire. Toute reproduction, représentation,
                modification ou exploitation, totale ou partielle, sans
                autorisation écrite préalable est interdite.
              </p>
              <p className="mt-3">
                Les <strong>logos des partenaires</strong> reproduits sur la
                page <a
                  href="/partenaires"
                  className="text-atlas-clay underline hover:text-atlas-terracotta"
                >/partenaires</a> et sur le bandeau de la page d'accueil
                demeurent la propriété de leurs détenteurs respectifs. Leur
                affichage relève d'un usage de référencement partenarial,
                avec l'accord des structures concernées.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Liens hypertextes
              </h2>
              <p>
                Le site contient des liens vers des sites tiers (partenaires,
                ressources externes). L'Association Partage n'exerce aucun
                contrôle éditorial sur ces sites et décline toute
                responsabilité quant à leur contenu, leur disponibilité ou
                leurs pratiques en matière de données personnelles.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Crédits
              </h2>
              <p>
                Photographies de terrain : équipe et bénévoles de
                l'association, partenaires institutionnels. Illustrations
                d'appoint : Unsplash (licence libre). Typographies : familles
                serif et sans-serif libres de droits servies par les services
                de polices web.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-bridge-ink mb-4 font-light">
                Droit applicable
              </h2>
              <p>
                Le présent site est soumis au droit français. Tout litige
                relatif à son utilisation relève de la compétence des
                tribunaux d'Orléans, sous réserve des règles d'ordre public
                applicables aux consommateurs.
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
