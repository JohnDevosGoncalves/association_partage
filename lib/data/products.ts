export type Product = {
  name: string;
  origin: string;
  description: string;
  category: "savon" | "huile";
};

export const COOPERATIVE_PRODUCTS: Product[] = [
  {
    name: "Savon au lait de chèvre",
    origin: "Coopérative du Haut-Atlas",
    description:
      "Saponification à froid, lait frais des chèvres du village. Apaisant, idéal peaux sensibles.",
    category: "savon",
  },
  {
    name: "Savon au lait d'ânesse",
    origin: "Coopérative du Haut-Atlas",
    description:
      "Riche en vitamines A, B et E. Reconnu pour ses vertus régénérantes et anti-âge.",
    category: "savon",
  },
  {
    name: "Huile d'olive vierge extra",
    origin: "Oliveraies du Souss-Massa",
    description:
      "Première pression à froid, variété Picholine marocaine. Notes herbacées et amande fraîche.",
    category: "huile",
  },
  {
    name: "Huile d'argan alimentaire",
    origin: "Arganeraie du Sud marocain",
    description:
      "Amandons torréfiés, extraction artisanale. Goût de noisette grillée, riche en oméga.",
    category: "huile",
  },
];

export type Partner = {
  slug: string;
  name: string;
  craft: string;
  city: string;
  since?: string;
  contribution: string;
  /** Phrase éditoriale longue pour la fiche détaillée */
  bio: string;
  /** Photo principale (portrait ou hero) */
  heroImage: string;
  /** Photo secondaire (produit, action, contexte) */
  detailImage: string;
  /** Couleurs d'accent issues de l'identité visuelle du partenaire */
  accent: {
    bg: string; // background utilisé pour la card (ex: noir studio pour Papion)
    text: string; // couleur de texte sur ce bg
  };
};

export const KIOSQUE_PARTNERS: Partner[] = [
  {
    slug: "christophe-hay",
    name: "Christophe Hay",
    craft: "Chef · double étoilé Michelin",
    city: "Blois · Loire",
    since: "Loire & Val de Loire",
    contribution: "Recettes signature pour le Kiosque d'Agadir",
    bio: "Référence absolue de la gastronomie ligérienne contemporaine. Sa Maison conjugue le produit local avec une exigence technique d'orfèvrerie. Pour le Kiosque, il signe une carte mezze gastronomique mariant les produits du Souss-Massa aux savoirs du Val de Loire.",
    heroImage: "/images/partners/christophe-hay/portrait.jpg",
    detailImage: "/images/partners/christophe-hay/plat-signature.jpg",
    accent: {
      bg: "#f6f8fb",
      text: "#0f0f0f",
    },
  },
  {
    slug: "sebastien-papion",
    name: "Sébastien Papion",
    craft: "Maître-confiseur · La nature du chocolat",
    city: "Orléans",
    contribution: "Confiseries, chocolat noisette et cotignacs",
    bio: "Artisan du chocolat reconnu pour son approche obsessionnelle de la matière première et son lien à la nature — son écureuil de compagnie est devenu sa signature visuelle. Le Kiosque recevra sa pâte Papienella noisette en exclusivité et des cotignacs à base d'agrumes du Souss-Massa.",
    heroImage: "/images/partners/sebastien-papion/portrait.jpg",
    detailImage: "/images/partners/sebastien-papion/produit-papienella.jpg",
    accent: {
      bg: "#0f0f0f",
      text: "#fbf8f3",
    },
  },
  {
    slug: "martin-pouret",
    name: "Martin-Pouret",
    craft: "Maître vinaigrier depuis 1797",
    city: "Orléans",
    since: "1797",
    contribution: "Moutardes et vinaigres d'Orléans en exclusivité",
    bio: "Dernière maison vinaigrière à perpétuer la méthode orléanaise — fermentation lente en fûts de chêne, deux siècles de savoir-faire ininterrompu. Pour le Kiosque, Moutarde d'Orléans 1797 au poivre de l'Île de Ré et vinaigres de Loire en bouteille dédiée.",
    heroImage: "/images/partners/martin-pouret/portrait-fondateurs.jpg",
    detailImage: "/images/partners/martin-pouret/produit-moutarde.jpg",
    accent: {
      bg: "#1a1a1a",
      text: "#fbf8f3",
    },
  },
  {
    slug: "duralex",
    name: "Duralex",
    craft: "Maître verrier · La Chapelle-Saint-Mesmin",
    city: "Orléans",
    since: "1945",
    contribution: "Verres Picardie en service au Kiosque",
    bio: "Icône du design industriel français, les verres Picardie de Duralex équipent les écoles, les bistrots et les tables du monde entier depuis 1945. Sauvée par ses salariés en SCOP en 2024, la verrerie reste à La Chapelle-Saint-Mesmin — son ADN coopératif résonne avec celui de notre association.",
    heroImage: "/images/partners/duralex/verres-picardie.jpg",
    detailImage: "/images/partners/duralex/verres-picardie.jpg",
    accent: {
      bg: "#f1ecdf",
      text: "#0f0f0f",
    },
  },
];
