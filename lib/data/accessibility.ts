export type PmrFeature = {
  /** Identifiant pour le schéma SVG */
  id: string;
  /** Pièce du bâtiment */
  room: string;
  /** Aménagement réalisé */
  title: string;
  /** Description détaillée */
  description: string;
  /** Norme ou spec technique */
  spec: string;
  /** Coordonnées dans le SVG du plan (% du viewBox) */
  pin: { x: number; y: number };
  /** Niveau du bâtiment (1, 2, 3) */
  level: 1 | 2 | 3;
};

export const PMR_FEATURES: PmrFeature[] = [
  {
    id: "entree",
    room: "Entrée",
    title: "Rampe d'accès à 6 % maximum",
    description:
      "L'entrée principale est de plain-pied avec le terrain. Aucun seuil. Une rampe douce conduit du portail à la porte, sur 8 mètres linéaires.",
    spec: "Pente 6 % · Norme française PMR",
    pin: { x: 18, y: 78 },
    level: 1,
  },
  {
    id: "couloirs",
    room: "Circulations",
    title: "Couloirs larges 1,40 m",
    description:
      "Tous les couloirs et passages sont dimensionnés pour un fauteuil roulant manuel avec accompagnant, ou un fauteuil électrique en pleine manœuvre.",
    spec: "1,40 m de largeur · 1,50 m d'aire de rotation",
    pin: { x: 50, y: 50 },
    level: 1,
  },
  {
    id: "chambres-pmr",
    room: "Chambres",
    title: "4 chambres PMR adaptées",
    description:
      "Chacune avec lit médicalisable (hauteur réglable), salle de bain en suite, bouton d'appel, et aire de transfert latérale.",
    spec: "Lit 0,60 m → 0,80 m · Bouton d'appel filaire",
    pin: { x: 75, y: 30 },
    level: 2,
  },
  {
    id: "sanitaires",
    room: "Sanitaires",
    title: "Douches à l'italienne, barres d'appui",
    description:
      "Toutes les salles de bain sont sans rebord, avec siège escamotable, barres murales horizontales/verticales, et WC suspendu à hauteur réglable.",
    spec: "Receveur extra-plat · 2 barres NF · WC hauteur 50 cm",
    pin: { x: 78, y: 55 },
    level: 2,
  },
  {
    id: "cuisine",
    room: "Cuisine",
    title: "Plan de travail à hauteur variable",
    description:
      "Hauteur réglable électriquement (75 cm pour assis, 90 cm pour debout), évier accessible par-dessous, plaques avec coupe-feu sécurité.",
    spec: "Hauteur 75 → 90 cm · Vide sous-évier 75 cm",
    pin: { x: 30, y: 45 },
    level: 1,
  },
  {
    id: "terrasses",
    room: "Terrasses",
    title: "Terrasses sans seuil",
    description:
      "Deux terrasses (sud et est) accessibles directement depuis l'intérieur sans aucun ressaut. Garde-corps réglementaires, ombrage par voile.",
    spec: "0 mm de seuil · Garde-corps 1,10 m",
    pin: { x: 85, y: 75 },
    level: 1,
  },
];
