import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostMeta,
} from "./types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Calcule le temps de lecture d'un texte (200 mots/minute).
 * Min. 1 minute pour les très courts.
 */
function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Liste tous les articles publiés, triés par date décroissante.
 * Ne lit que le frontmatter (pas le contenu) — optimisé pour la liste.
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  let files: string[];
  try {
    files = await readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await readFile(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as BlogPostFrontmatter;
      const slug = file.replace(/\.mdx$/, "");

      return {
        ...frontmatter,
        slug,
        readingTime: computeReadingTime(content),
      } satisfies BlogPostMeta;
    }),
  );

  // Tri date décroissante (plus récent en premier)
  return posts.sort(
    (a, b) =>
      new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
}

/**
 * Charge un article spécifique par son slug — frontmatter + contenu.
 * Retourne null si le fichier n'existe pas (pour 404 propre).
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      ...frontmatter,
      slug,
      readingTime: computeReadingTime(content),
      content,
    } satisfies BlogPost;
  } catch {
    return null;
  }
}

/**
 * Liste les slugs de tous les articles — utilisé par generateStaticParams.
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
