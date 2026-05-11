import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

/**
 * Sitemap XML — généré automatiquement à /sitemap.xml.
 * Inclut la home + pages dédiées + blog index + tous les articles publiés
 * + ancres sur la home.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Pages dédiées — priorité haute, indexation prioritaire
  const dedicatedPages = [
    { path: "/mecenat", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/maison-bledi", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/maroc", priority: 0.85, changeFrequency: "yearly" as const },
    { path: "/partenaires", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/histoire", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/cooperative", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/kiosque", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/loire", priority: 0.75, changeFrequency: "yearly" as const },
    { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  // Ancres sur la home — utiles pour les sitelinks Google
  const homeAnchors = [
    { hash: "#histoire", priority: 0.6 },
    { hash: "#bledi", priority: 0.6 },
    { hash: "#cooperative", priority: 0.6 },
    { hash: "#kiosque", priority: 0.6 },
    { hash: "#mecenat", priority: 0.7 },
    { hash: "#contact", priority: 0.6 },
  ];

  // Articles de blog — priorité 0.7, fréquence yearly (contenu evergreen)
  const posts = await getAllPosts();
  const blogPosts = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.published),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...dedicatedPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...blogPosts,
    ...homeAnchors.map((a) => ({
      url: `${SITE_URL}/${a.hash}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: a.priority,
    })),
  ];
}
