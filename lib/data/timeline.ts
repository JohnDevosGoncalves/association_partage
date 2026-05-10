export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  side: "loire" | "atlas" | "bridge";
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2015",
    title: "Genèse — premiers pas au Sri Lanka",
    description:
      "Création de l'association à Orléans. Première mission de scolarisation : 30 cartables, fournitures complètes et financement du transport des familles vers les écoles.",
    side: "loire",
  },
  {
    year: "2018",
    title: "Le pont vers le Haut-Atlas",
    description:
      "Rencontre avec les villages berbères. Lancement du projet de centre permanent en zone rurale marocaine.",
    side: "bridge",
  },
  {
    year: "2021",
    title: "Construction de la Maison Bledi",
    description:
      "130 m² sur 3 niveaux, accessibilité PMR totale, autosuffisance énergétique (solaire, recyclage des eaux, compost).",
    side: "atlas",
  },
  {
    year: "2023",
    title: "La coopérative prend racine",
    description:
      "Production locale de savons bio (lait de chèvre et d'ânesse) et d'huiles d'olive et d'argan. Emplois pour les femmes du village.",
    side: "atlas",
  },
  {
    year: "2024",
    title: "Le Kiosque Solidaire d'Agadir",
    description:
      "Vitrine de la gastronomie orléanaise au Maroc, en partenariat avec Christophe Hay, Martin-Pouret et Sébastien Papion.",
    side: "bridge",
  },
];

export const IMPACTS = [
  { value: 300, suffix: " jours", label: "de soleil par an au Haut-Atlas" },
  { value: 1600, suffix: "", label: "personnalités engagées avec MMF" },
  { value: 130, suffix: " m²", label: "d'accueil PMR à la Maison Bledi" },
  { value: 30, suffix: "", label: "cartables remis chaque rentrée" },
];
