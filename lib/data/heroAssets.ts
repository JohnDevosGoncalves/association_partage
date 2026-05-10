/**
 * Configuration centralisée des assets photographiques du Hero.
 *
 * État actuel : photos Unsplash libres de droits (CC0) servant de
 * placeholders visuels. Pour remplacer par vos propres photos, déposez
 * un fichier au chemin indiqué dans `localPath` et changez `src` pour
 * pointer dessus (ex: src: "/images/hero/loire-foreground.jpg").
 *
 * Format recommandé : JPEG ou WebP, ratio 16:9, 1920×1080 minimum,
 * sRGB, optimisées (TinyPNG ou Squoosh.app).
 */

export type LayerAsset = {
  /** URL de la photo affichée (Unsplash CC0 pour la maquette) */
  src: string;
  /** Chemin local cible quand vous fournirez vos propres photos */
  localPath: string;
  /** Description pour alt text et briefing photo */
  alt: string;
  /** Profondeur : 0 = arrière-plan (immobile), 1 = premier plan (vitesse max) */
  depth: number;
  /** Couleur dominante de la photo, utilisée comme background-color de secours */
  fallbackColor: string;
};

/**
 * Scène Loire — composition à 3 plans :
 *  • Arrière-plan : silhouette du quai et de la cathédrale
 *  • Plan médian  : brume matinale sur l'eau
 *  • Premier plan : arches du Pont Royal en pierre de tuffeau
 */
export const LOIRE_LAYERS: LayerAsset[] = [
  {
    src: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/loire-background.jpg",
    alt: "Silhouette de la cathédrale et du quai d'Orléans dans la lumière du matin",
    depth: 0.15,
    fallbackColor: "#1b3a5b",
  },
  {
    src: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/loire-mid.jpg",
    alt: "Brume matinale flottant au-dessus du fleuve",
    depth: 0.45,
    fallbackColor: "#2d5a82",
  },
  {
    src: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/loire-foreground.jpg",
    alt: "Arches en pierre de tuffeau du Pont Royal",
    depth: 0.85,
    fallbackColor: "#7a9cb8",
  },
];

/**
 * Scène Atlas — composition à 3 plans :
 *  • Arrière-plan : sommets enneigés du Haut-Atlas
 *  • Plan médian  : architecture berbère en pisé ocre
 *  • Premier plan : oliviers et végétation au pied du chemin
 */
export const ATLAS_LAYERS: LayerAsset[] = [
  {
    src: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/atlas-background.jpg",
    alt: "Sommets enneigés du Haut-Atlas marocain au crépuscule",
    depth: 0.15,
    fallbackColor: "#c8553d",
  },
  {
    src: "https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/atlas-mid.jpg",
    alt: "Architecture berbère traditionnelle en pisé ocre",
    depth: 0.45,
    fallbackColor: "#b5824a",
  },
  {
    src: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=1920&q=80&auto=format&fit=crop",
    localPath: "/images/hero/atlas-foreground.jpg",
    alt: "Oliviers centenaires au pied du Haut-Atlas",
    depth: 0.85,
    fallbackColor: "#8b3a2a",
  },
];

/**
 * Textures de matière pour fonds de section (eco-conception : 1 fichier
 * léger répété en motif plutôt qu'une grosse image plein cadre).
 */
export const TEXTURES = {
  tuffeau: {
    src: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=1200&q=70",
    localPath: "/images/textures/tuffeau.jpg",
    alt: "Pierre de tuffeau d'Orléans",
  },
  sable: {
    src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=70",
    localPath: "/images/textures/sable.jpg",
    alt: "Sable doré",
  },
  lin: {
    src: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=1200&q=70",
    localPath: "/images/textures/lin.jpg",
    alt: "Lin écru tissé",
  },
};

export const COLOMBEL_PORTRAIT = {
  src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  localPath: "/images/portraits/colombel.jpg",
  alt: "Portrait de Thomas Colombel, parrain de l'association",
};
