/**
 * URLs Unsplash de fallback pour chaque photo locale attendue.
 *
 * Tant que le client n'a pas déposé sa photo réelle dans /public/images/,
 * le composant <SmartImage> affichera ces URLs thématiques stables.
 * Dès que la vraie photo est ajoutée, le fallback est ignoré automatiquement.
 *
 * Photos Unsplash sélectionnées pour leur cohérence thématique et leur
 * stabilité (URLs testées HTTP 200).
 */

const u = (id: string, w = 1920, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const IMAGE_FALLBACKS: Record<string, string> = {
  // ─── Atlas — environnement Maison Bledi ──────────────────────
  "/images/atlas/vallee-graminees.jpg": u("1489493512598-d08130f49bea", 2400),
  "/images/atlas/village-pise.jpg": u("1565689157206-0fddef7589a2"),
  "/images/atlas/cascade-oasis.jpg": u("1473625247510-8ceb1760943f"),
  "/images/atlas/riviere-heron.jpg": u("1465056836041-7f43ac27dcb5"),
  "/images/atlas/ecureuil-berberie.jpg": u("1547234935-80c7145ec969"),
  "/images/atlas/agame-rocher.jpg": u("1552083375-1447ce886485"),

  // ─── Sri Lanka — Opération Cartable ──────────────────────
  "/images/sri-lanka/groupe-classe.jpg": u("1503676260728-1c00da094a0b", 2400),
  "/images/sri-lanka/groupe-cartables.jpg": u("1488521787991-ed7bbaae773c"),
  "/images/sri-lanka/enfant-merci.jpg": u("1488521787991-ed7bbaae773c"),
  "/images/sri-lanka/enseignante-cadeau.jpg": u("1486916856361-4d24e2d18619"),
  "/images/sri-lanka/medaille-merci.jpg": u("1469474968028-56623f02e42e"),

  // ─── Partenaires Kiosque ──────────────────────
  "/images/partners/christophe-hay/portrait.jpg": u("1577219491135-ce391730fb2c"),
  "/images/partners/christophe-hay/action.jpg": u("1556909114-f6e7ad7d3136"),
  "/images/partners/christophe-hay/plat-signature.jpg": u("1600857544200-b2f666a9a2ec"),
  "/images/partners/christophe-hay/dessert.jpg": u("1488477181946-6428a0291777"),
  "/images/partners/christophe-hay/etablissement.jpg": u("1551776235-dde6d482980b"),

  "/images/partners/sebastien-papion/portrait.jpg": u("1577219491135-ce391730fb2c"),
  "/images/partners/sebastien-papion/portrait-large.jpg": u("1577219491135-ce391730fb2c"),
  "/images/partners/sebastien-papion/produit-papienella.jpg": u("1599599810694-57a2ca8276a8"),
  "/images/partners/sebastien-papion/interaction.jpg": u("1599599810694-57a2ca8276a8"),

  "/images/partners/martin-pouret/portrait-fondateurs.jpg": u("1574775395858-3a5cd6e0a5c3"),
  "/images/partners/martin-pouret/produit-moutarde.jpg": u("1474979266404-7eaacbcd87c5"),

  "/images/partners/duralex/verres-picardie.jpg": u("1592991538534-00d62fdc41a9"),
};

/**
 * Retourne le fallback Unsplash pour un chemin local, ou null si
 * aucun mapping défini. Utilisé par les composants qui passent par
 * <SmartImage>.
 */
export function getFallback(localPath: string): string | undefined {
  return IMAGE_FALLBACKS[localPath];
}
