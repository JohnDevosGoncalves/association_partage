/**
 * Source de vérité pour les métadonnées SEO partagées.
 * Modifiez ici lors du changement de domaine final.
 */

// Note : on utilise `||` (et non `??`) pour que la chaîne vide retombe
// aussi sur le fallback — sinon une env var Vercel définie à "" plombe
// tout le SEO (canonicals, sitemap, OG images) avec une URL invalide.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://association-partage.fr";

export const SITE_NAME = "Association Partage";

export const SITE_TAGLINE = "Entre Terre et Loire";

export const SITE_DESCRIPTION =
  "Un pont solidaire d'Orléans au Haut-Atlas — scolarisation au Sri Lanka, accessibilité PMR, coopérative bio et gastronomie partagée. Reconnue d'intérêt général depuis 2015.";

export const SITE_KEYWORDS = [
  "Association Partage",
  "Orléans",
  "Haut-Atlas",
  "Maroc",
  "Sri Lanka",
  "scolarisation",
  "Maison Bledi",
  "PMR",
  "accessibilité",
  "mécénat",
  "coopérative bio",
  "savon argan",
  "Christophe Hay",
  "Martin-Pouret",
  "Thomas Colombel",
  "Unistellar",
  "paragolf",
  "intérêt général",
];

export const SITE_LOCALE = "fr_FR";

/** Liens sociaux — à compléter quand vous aurez les comptes officiels. */
export const SOCIAL_LINKS = {
  // facebook: "https://facebook.com/associationpartage",
  // instagram: "https://instagram.com/association.partage",
  // linkedin: "https://linkedin.com/company/association-partage",
};

export const ORGANIZATION_INFO = {
  legalName: "Association Partage",
  foundingDate: "2015",
  email: "contact@association-partage.fr",
  phone: "+33 2 38 00 00 00",
  addressLocality: "Orléans",
  addressCountry: "FR",
  areasServed: ["France", "Maroc", "Sri Lanka"],
};
