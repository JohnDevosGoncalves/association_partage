/**
 * Schéma d'un article de blog.
 *
 * Le frontmatter MDX doit respecter cette structure. La fonction
 * getPostBySlug() le parse via gray-matter et applique des valeurs par
 * défaut raisonnables (readingTime calculé, updated = published si absent).
 */
export type BlogPostFrontmatter = {
  /** Titre H1 — visible dans la liste et l'article */
  title: string;
  /** Description SEO + meta description (155-160 caractères idéalement) */
  description: string;
  /** Date de publication ISO (YYYY-MM-DD) */
  published: string;
  /** Date de dernière mise à jour ISO (optionnelle, défaut = published) */
  updated?: string;
  /** Catégorie principale — pour filtres et JSON-LD */
  category: BlogCategory;
  /** Tags secondaires — pour mots-clés JSON-LD */
  tags: string[];
  /** Auteur — nom affiché (défaut "Association Partage") */
  author?: string;
  /** Image hero de l'article (chemin local /images/blog/...) */
  hero?: string;
  /** Alt text de l'image hero — obligatoire si hero présent */
  heroAlt?: string;
  /** TLDR — 1-2 phrases de réponse directe (boost AEO) */
  tldr: string;
};

export type BlogCategory =
  | "histoire"
  | "maison-bledi"
  | "cooperative"
  | "mecenat"
  | "territoire-loire"
  | "territoire-maroc"
  | "sri-lanka";

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  histoire: "Histoire & fondation",
  "maison-bledi": "Maison Bledi & PMR",
  cooperative: "Coopérative",
  mecenat: "Mécénat & fiscalité",
  "territoire-loire": "Loire & Orléans",
  "territoire-maroc": "Haut-Atlas",
  "sri-lanka": "Sri Lanka",
};

export type BlogPostMeta = BlogPostFrontmatter & {
  /** Identifiant URL — nom du fichier sans .mdx */
  slug: string;
  /** Temps de lecture estimé en minutes (200 mots/min) */
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  /** Contenu MDX brut — compilé côté serveur */
  content: string;
};
