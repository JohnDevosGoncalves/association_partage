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
  name: string;
  craft: string;
  city: string;
  contribution: string;
};

export const KIOSQUE_PARTNERS: Partner[] = [
  {
    name: "Christophe Hay",
    craft: "Chef étoilé",
    city: "Blois / Orléans",
    contribution: "Recettes signature pour le Kiosque d'Agadir",
  },
  {
    name: "Martin-Pouret",
    craft: "Vinaigrier depuis 1797",
    city: "Orléans",
    contribution: "Vinaigres d'Orléans en exclusivité",
  },
  {
    name: "Sébastien Papion",
    craft: "Maître-confiseur",
    city: "Orléans",
    contribution: "Cotignacs et confiseries traditionnelles",
  },
];
