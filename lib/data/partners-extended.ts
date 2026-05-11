/**
 * Tous les partenaires de l'Association Partage — au-delà des 4 artisans
 * du Kiosque Solidaire (qui sont dans products.ts → KIOSQUE_PARTNERS).
 *
 * Catégorisé par domaine pour structurer la page /partenaires. Chaque entrée
 * comporte un site web officiel pour le maillage SEO sortant.
 */

export type ExtendedPartner = {
  /** Identifiant unique URL-safe */
  slug: string;
  /** Nom officiel affiché */
  name: string;
  /** Métier ou positionnement */
  role: string;
  /** Ville ou zone géographique */
  city: string;
  /** Description éditoriale 2-4 phrases */
  description: string;
  /** Site web officiel — pour le lien sortant */
  website: string;
  /** Catégorie pour le regroupement */
  category: PartnerCategory;
};

export type PartnerCategory =
  | "kiosque"
  | "gastronomie"
  | "services-pros"
  | "energie-mobilite"
  | "loisirs-sport"
  | "communication";

export const CATEGORY_LABELS: Record<PartnerCategory, string> = {
  kiosque: "Artisans du Kiosque Solidaire",
  gastronomie: "Gastronomie & Torréfaction",
  "services-pros": "Services aux professionnels",
  "energie-mobilite": "Énergie & Mobilité",
  "loisirs-sport": "Loisirs & Sport",
  communication: "Communication & Image",
};

export const CATEGORY_INTROS: Record<PartnerCategory, string> = {
  kiosque:
    "Quatre maîtres-artisans orléanais qui prêtent leur savoir-faire au Kiosque Solidaire d'Agadir. Chacun signe une présence concrète : recettes, produits, ou identité matérielle.",
  gastronomie:
    "Les acteurs du goût et du café qui complètent l'écosystème gourmand de l'association — dîners caritatifs, paniers donateurs, partenariats commerciaux.",
  "services-pros":
    "Les structures de service qui accompagnent l'association sur le quotidien administratif, juridique et financier. Sans eux, le bureau bénévole ne tiendrait pas son rythme.",
  "energie-mobilite":
    "Les partenaires qui soutiennent l'autosuffisance énergétique de la Maison Bledi et la mobilité verte de l'équipe orléanaise.",
  "loisirs-sport":
    "Les acteurs du sport et du loisir qui mobilisent leurs adhérents et leurs équipements pour les opérations caritatives.",
  communication:
    "Les partenaires de l'image qui rendent visible le travail de l'association — photographie, web, identité visuelle.",
};

export const EXTENDED_PARTNERS: ExtendedPartner[] = [
  // ─── Kiosque (4) ───
  {
    slug: "christophe-hay",
    name: "Christophe Hay",
    role: "Chef · double étoilé Michelin",
    city: "Blois · Val de Loire",
    description:
      "Référence absolue de la gastronomie ligérienne contemporaine. Sa Maison cumule deux étoiles et plusieurs distinctions internationales. Pour le Kiosque, il signe une carte mezze gastronomique mariant les produits du Souss-Massa aux savoirs du Val de Loire.",
    website: "https://fleurdeloire.com/fr/restaurant-christophe-hay.html",
    category: "kiosque",
  },
  {
    slug: "sebastien-papion",
    name: "Sébastien Papion",
    role: "Maître-confiseur · La nature du chocolat",
    city: "Orléans",
    description:
      "Artisan du chocolat à l'approche obsessionnelle de la matière première. Son écureuil de compagnie est devenu sa signature visuelle. Le Kiosque reçoit sa pâte Papienella noisette en exclusivité et des cotignacs aux agrumes du Souss-Massa.",
    website: "https://www.sebastien-papion.fr/",
    category: "kiosque",
  },
  {
    slug: "martin-pouret",
    name: "Martin-Pouret",
    role: "Maître-vinaigrier depuis 1797",
    city: "Orléans",
    description:
      "Dernière maison à perpétuer la méthode orléanaise — fermentation lente en fûts de chêne sur plusieurs mois. Deux siècles de savoir-faire ininterrompu. Pour le Kiosque : Moutarde d'Orléans 1797 au poivre de l'Île de Ré et vinaigres de Loire en bouteille dédiée.",
    website: "https://martin-pouret.com/",
    category: "kiosque",
  },
  {
    slug: "duralex",
    name: "Duralex",
    role: "Maître verrier · La Chapelle-Saint-Mesmin",
    city: "Orléans",
    description:
      "Verrerie fondée en 1945. Le verre Picardie équipe les écoles, les bistrots et les tables du monde entier. Repris en SCOP par ses salariés en 2024 — un ADN coopératif qui résonne avec celui de l'association. Service complet au Kiosque d'Agadir.",
    website: "https://www.duralex.com/",
    category: "kiosque",
  },

  // ─── Gastronomie & Torréfaction (1) ───
  {
    slug: "les-cafes-d-eric",
    name: "Les Cafés d'Éric",
    role: "Torréfacteur artisanal",
    city: "Orléans",
    description:
      "Torréfaction lente en petits lots de cafés de spécialité sourcés directement. Partenaire café de référence pour les opérations caritatives à Orléans et fournisseur exclusif du Kiosque d'Agadir.",
    website: "https://www.lescafesderic.fr/",
    category: "gastronomie",
  },

  // ─── Services aux professionnels (4) ───
  {
    slug: "allianz-theobald-auchere",
    name: "Allianz Théobald-Auchère",
    role: "Agence d'assurance",
    city: "Saint-Pryvé-Saint-Mesmin",
    description:
      "Agence Allianz qui assure le centre Maison Bledi, les volontaires en mission et les événements caritatifs de l'association. Un accompagnement pensé pour les structures associatives à présence internationale.",
    website: "https://agence.allianz.fr/st-pryve-st-mesmin-45750-401451",
    category: "services-pros",
  },
  {
    slug: "prelia",
    name: "Prélia",
    role: "Courtier en crédit",
    city: "Orléans · Région Centre",
    description:
      "Courtage en financement immobilier et professionnel. A accompagné la structuration du financement à long terme de la Maison Bledi via un emprunt à taux zéro auprès d'une fondation partenaire.",
    website: "https://www.prelia-credit.eu/",
    category: "services-pros",
  },
  {
    slug: "acr-distribution",
    name: "ACR Distribution Centre",
    role: "Distribution professionnelle",
    city: "Centre-Val de Loire",
    description:
      "Grossiste partenaire pour l'approvisionnement matériel des opérations caritatives — équipements, fournitures, matériel évènementiel. Logistique fiable indispensable au modèle bénévole de l'association.",
    website: "https://www.acrdistribution.fr/",
    category: "services-pros",
  },
  {
    slug: "cvlo",
    name: "CVLO",
    role: "Centre-Val de Loire Organisation",
    city: "Région Centre-Val de Loire",
    description:
      "Structure d'accompagnement régional qui contribue au maillage territorial de l'association et facilite l'identification de mécènes potentiels dans la région Centre.",
    website: "https://www.clvo.fr/",
    category: "services-pros",
  },

  // ─── Énergie & Mobilité (3) ───
  {
    slug: "optima-energie",
    name: "Optima Energie",
    role: "Conseil en performance énergétique",
    city: "Orléans",
    description:
      "Cabinet de conseil sur l'efficience énergétique des bâtiments. A étudié l'autosuffisance solaire de la Maison Bledi et optimisé les choix techniques (photovoltaïque, eau chaude solaire, isolation).",
    website: "https://www.optima-energie.fr/experts-locaux/cabinet-conseiller-energie-orleans/",
    category: "energie-mobilite",
  },
  {
    slug: "la-borne-elec-energie",
    name: "La Borne Élec Énergie",
    role: "Installation de bornes de recharge",
    city: "Orléans",
    description:
      "Spécialiste de l'installation de bornes de recharge pour véhicules électriques. Partenaire prévu pour l'équipement futur du véhicule TPMR de la Maison Bledi (mécénat niveau Platinium).",
    website: "https://labornelecenergie.fr/",
    category: "energie-mobilite",
  },
  {
    slug: "equip-jardin",
    name: "Équip'Jardin",
    role: "Motoculture & espaces verts",
    city: "Olivet",
    description:
      "Concession motoculture qui équipe l'entretien des espaces extérieurs de la Maison Bledi et des terrains partenaires en Loire. Matériel professionnel adapté aux contraintes du Haut-Atlas (climat sec, terrains caillouteux).",
    website: "https://concessions.equipjardin.com/olivet/",
    category: "energie-mobilite",
  },

  // ─── Loisirs & Sport (2) ───
  {
    slug: "golf-de-limere",
    name: "Golf de Limère",
    role: "Golf 18 trous · Gaia Concept",
    city: "Vienne-en-Val · Loiret",
    description:
      "Parcours golf 18 trous du sud-Loiret. Accueille régulièrement les tournois caritatifs annuels au profit de l'association — l'occasion de réunir mécènes, donateurs et bénévoles autour d'un même green.",
    website: "https://gaiaconcept-centre.fr/golf-de-limere/",
    category: "loisirs-sport",
  },
  {
    slug: "open-6",
    name: "Open 6",
    role: "Club de padel & loisirs raquette",
    city: "Orléans · Région",
    description:
      "Club de padel et tennis qui mobilise ses adhérents lors de tournois caritatifs et événements dédiés à l'association. Une communauté sportive engagée au profit du programme Sri Lanka et de la Maison Bledi.",
    website: "https://open6.fr/",
    category: "loisirs-sport",
  },

  // ─── Communication & Image (2) ───
  {
    slug: "images-photo-orleans",
    name: "Images Photo Orléans",
    role: "Studio photographie",
    city: "Orléans",
    description:
      "Photographe de référence orléanais. Documente les missions, les événements caritatifs, et produit les portraits des partenaires utilisés dans la communication de l'association.",
    website: "https://orleans.images-photo.com/",
    category: "communication",
  },
  {
    slug: "john-devos",
    name: "John Devos",
    role: "Studio web · Identité numérique",
    city: "Orléans",
    description:
      "Conception et développement du site de l'association, identité visuelle web et stratégie digitale. Bénévolat de compétences en mécénat numérique au service du rayonnement en ligne du projet.",
    website: "https://www.johndevos.fr/",
    category: "communication",
  },
];

/**
 * Helper : groupe les partenaires par catégorie pour le rendu de la page.
 */
export function groupPartnersByCategory(): Record<
  PartnerCategory,
  ExtendedPartner[]
> {
  const result = {} as Record<PartnerCategory, ExtendedPartner[]>;
  for (const cat of Object.keys(CATEGORY_LABELS) as PartnerCategory[]) {
    result[cat] = EXTENDED_PARTNERS.filter((p) => p.category === cat);
  }
  return result;
}

/**
 * Manifeste des fichiers logo dans /public/images/partners-logos/.
 * L'extension varie selon ce que sert chaque site (PNG, JPG, SVG).
 * Si un slug est absent, le composant PartnerLogo affiche les initiales.
 */
const PARTNER_LOGO_FILES: Record<string, string> = {
  "acr-distribution": "acr-distribution.svg",
  "allianz-theobald-auchere": "allianz-theobald-auchere.png",
  "christophe-hay": "christophe-hay.svg",
  cvlo: "cvlo.png",
  duralex: "duralex.svg",
  "equip-jardin": "equip-jardin.png",
  "golf-de-limere": "golf-de-limere.png",
  "images-photo-orleans": "images-photo-orleans.jpg",
  "john-devos": "john-devos.svg",
  "la-borne-elec-energie": "la-borne-elec-energie.png",
  "les-cafes-d-eric": "les-cafes-d-eric.jpg",
  "martin-pouret": "martin-pouret.png",
  "open-6": "open-6.png",
  "optima-energie": "optima-energie.webp",
  prelia: "prelia.png",
  "sebastien-papion": "sebastien-papion.svg",
};

export function getPartnerLogoSrc(slug: string): string | null {
  const file = PARTNER_LOGO_FILES[slug];
  return file ? `/images/partners-logos/${file}` : null;
}

/**
 * Logos servis en blanc transparent par le partenaire (faits pour fond foncé).
 * On les force en noir via `filter: brightness(0)` pour qu'ils restent lisibles
 * sur le fond crème de l'interface.
 */
export const WHITE_PARTNER_LOGOS: ReadonlySet<string> = new Set([
  "la-borne-elec-energie",
  "golf-de-limere",
  "john-devos",
]);

/** Initiales du partenaire pour le fallback visuel (max 2 lettres). */
export function getPartnerInitials(name: string): string {
  const words = name
    .split(/\s+/)
    .filter((w) => w.length > 0 && !/^[&·-]+$/.test(w));
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
