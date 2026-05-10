export type MecenatTier = {
  id: "bronze" | "argent" | "or" | "platinium";
  label: string;
  range: string;
  accent: string;
  impacts: string[];
  signature: string;
};

export const MECENAT_TIERS: MecenatTier[] = [
  {
    id: "bronze",
    label: "Bronze",
    range: "1 000 € – 4 999 €",
    accent: "#B5824A",
    impacts: [
      "Équipement de la cuisine de la Maison Bledi",
      "Fournitures scolaires pour 30 enfants au Sri Lanka",
      "Don d'un mois de produits de la coopérative",
    ],
    signature: "Mention sur la page Mécénat",
  },
  {
    id: "argent",
    label: "Argent",
    range: "5 000 € – 14 999 €",
    accent: "#C0C5CB",
    impacts: [
      "Aménagement d'une chambre PMR aux normes",
      "Soutien d'un cycle scolaire complet",
      "Visite privée du centre au Haut-Atlas",
    ],
    signature: "Logo sur supports + visite du site",
  },
  {
    id: "or",
    label: "Or",
    range: "15 000 € – 49 999 €",
    accent: "#E8A33D",
    impacts: [
      "Acquisition d'un Quadrix tout-terrain PMR",
      "Bungalow de répit dédié à l'ONG partenaire",
      "Naming d'un espace de la Maison Bledi",
    ],
    signature: "Naming + carte de mécène premium",
  },
  {
    id: "platinium",
    label: "Platinium",
    range: "50 000 € et +",
    accent: "#1B3A5B",
    impacts: [
      "Acquisition d'un véhicule TPMR adapté",
      "Cofinancement d'une extension solaire complète",
      "Parrainage nominatif d'une promotion d'enfants",
    ],
    signature: "Mécène fondateur — privilèges à vie",
  },
];
